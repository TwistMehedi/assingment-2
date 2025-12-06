import { Request, Response } from "express";
import { BookingService } from "./booking.service";
import { JwtPayload } from "jsonwebtoken";

export const BookingController = {
    createBooking: async (req: Request, res: Response) => {
        try {

            const { customer_id, vehicle_id, rent_start_date, rent_end_date, status } = req.body;

            const booking = await BookingService.createBokking(customer_id, vehicle_id, rent_start_date, rent_end_date, status);


            return res.status(201).json({
                success: true,
                message: "Booking created successfully",
                data: {
                    id: booking.id,
                    customer_id: booking.customer_id,
                    vehicle_id: booking.vehicle_id,
                    rent_start_date: booking.rent_start_date,
                    rent_end_date: booking.rent_end_date,
                    total_price: booking.total_price,
                    status: booking.status,
                    vehicle: {
                        vehicle_name: booking.vehicle_name,
                        daily_rent_price: booking.daily_rent_price
                    }
                }
            });

        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message || "Internal server booking create error"
            });
        };
    },

    getBookings: async (req: Request, res: Response) => {

        try {
            const userId = req.user?.id
            const role = req.user?.role as string;

            const bookings = await BookingService.getAllBookings(userId, role);

            return res.json({
                success: true,
                message: "Bookings retrieved successfully",
                data: bookings,
            });

        } catch (error: any) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: error.message || "Failed to retrieve bookings",
            });
        }
    },

    bookingStatus: async (req: Request, res: Response) => {
        try {
            const id = req.params.bookingId as string;
            const { status } = req.body;

            if (!req.user) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const updatedBooking = await BookingService.bookingStatus(id,status);

            const message =
                status === "cancelled"
                    ? "Booking cancelled successfully"
                    : "Booking marked as returned. Vehicle is now available";

            res.json({
                success: true,
                message,
                data: updatedBooking,
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message || "Failed to update booking",
            });
        }
    }
}