import pool from "../../config/database"
import { VehicleModel } from "../vehicle/vehicle.model";
import { BookingModel } from './booking.model';


export const BookingService = {

    createBokking: async (customer_id: number, vehicle_id: number, rent_start_date: string,
        rent_end_date: string, status?: string) => {

        const vehicleResult = await pool.query("SELECT vehicle_name, daily_rent_price FROM vehicles WHERE id = $1", [vehicle_id]);

        const daily_rent_price = vehicleResult.rows[0].daily_rent_price;

        const startDate = new Date(rent_start_date);
        const endDate = new Date(rent_end_date);

        const timeDiff = endDate.getTime() - startDate.getTime();
        
        const number_of_days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        const total_price = daily_rent_price * number_of_days;

        const booking = await pool.query(BookingModel.createBokking, [customer_id, vehicle_id, rent_start_date,
            rent_end_date, total_price, status || "active",]);

        const newBooking = booking.rows[0];
        const bookingId = newBooking.id;

        await pool.query(
            "UPDATE vehicles SET availability_status = $1 WHERE id = $2",
            ["booked", vehicle_id]
        );

        const joinQuery = `SELECT 
                b.id,
                b.customer_id,
                b.vehicle_id,
                b.rent_start_date,
                b.rent_end_date,
                b.total_price,
                b.status,
                v.vehicle_name,
                v.daily_rent_price
            FROM bookings b
            JOIN vehicles v ON b.vehicle_id = v.id
            WHERE b.id = $1
        `;

        const bookingData = await pool.query(joinQuery, [bookingId]);
        return bookingData.rows[0];
    },

    getAllBookings: async (userId: string, role: string) => {

        let query = "";

        let params: any[] = [];

        if (role === "admin") {
            query = `
        SELECT 
          b.id,
          b.customer_id,
          b.vehicle_id,
          b.rent_start_date,
          b.rent_end_date,
          b.total_price,
          b.status,
          json_build_object(
            'name', u.name,
            'email', u.email
          ) AS customer,
          json_build_object(
            'vehicle_name', v.vehicle_name,
            'registration_number', v.registration_number
          ) AS vehicle
        FROM bookings b
        JOIN users u ON b.customer_id = u.id
        JOIN vehicles v ON b.vehicle_id = v.id
        ORDER BY b.rent_start_date DESC
      `;
        } else if (role === "customer") {
            query = `
        SELECT 
          b.id,
          b.customer_id,
          b.vehicle_id,
          b.rent_start_date,
          b.rent_end_date,
          b.total_price,
          b.status,
          json_build_object(
            'vehicle_name', v.vehicle_name,
            'registration_number', v.registration_number,
            'type', v.type
          ) AS vehicle
        FROM bookings b
        JOIN users u ON b.customer_id = u.id
        JOIN vehicles v ON b.vehicle_id = v.id
        WHERE b.customer_id = $1
        ORDER BY b.rent_start_date DESC
      `;
            params = [userId];
        }

        const result = await pool.query(query, params);
        return result.rows;
    },

    bookingStatus: async (id: string, status: "cancelled" | "returned") => {

        await pool.query("BEGIN");

        const bookingResult = await pool.query(BookingModel.getBooking, [id]);

        const booking = bookingResult.rows[0];

        const updateBooking = await pool.query(BookingModel.updateStatus, [status, id]);
        const updatedBooking = updateBooking.rows[0];

        let vehicleUpdate: any = null;

        if (status === "returned") {

            const vehicleRes = await pool.query(VehicleModel.updateVehicleStatus, ["available", booking.vehicle_id]);

            vehicleUpdate = vehicleRes.rows[0];
        };


        await pool.query("COMMIT");


        if (status === "returned") {
            return {
                ...updatedBooking,
                vehicle: vehicleUpdate,
            };
        } else {
            return updatedBooking;
        };


    },

    activeBooking: async(id: string)=>{

           const activeBooking = await pool.query(BookingModel.activeBooking,[id]);

           return activeBooking;
    }
}