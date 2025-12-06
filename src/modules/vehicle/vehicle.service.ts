import pool from "../../config/database"
import { VehicleModel } from "./vehicle.model"


export const VehicleService = {

    createVehicle: async (vehicle_name: string, type: string, registration_number: string, daily_rent_price: number, availability_status: string) => {
        const result = await pool.query(VehicleModel.createVehicle, [vehicle_name, type, registration_number, daily_rent_price, availability_status]);

        const vehicle = result.rows[0];

        return vehicle;
    },

    getVehicle: async () => {
        const vehicle = await pool.query(VehicleModel.getVehicle);

        return vehicle.rows;
    },

    getVehicleById: async(id:string)=>{

        const vehicle = await pool.query(VehicleModel.getVehicleById, [id]);

        return vehicle.rows[0];
    },

    updateVehicle: async(vehicle_name: string, type: string, registration_number: string, daily_rent_price: number, availability_status: string, id:string)=>{
        const updateVehicle = await pool.query(VehicleModel.updateVehicle, [vehicle_name, type, registration_number, daily_rent_price, availability_status, id]);

        return updateVehicle.rows[0];
    },

    deleteVehicle: async(id: string)=>{

        const vehicle = await pool.query(VehicleModel.deleteVehicle, [id]);

        return vehicle
         
    }

}