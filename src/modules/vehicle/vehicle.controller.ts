import { Request, Response } from 'express';
import { VehicleService } from './vehicle.service';
import { required } from '../../helper/required';


export const VehicleController = {

    createVehicle: async (req: Request, res: Response) => {

        try {

            const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = req.body;

            required({ vehicle_name, registration_number, daily_rent_price }, res);

            const vehicle = await VehicleService.createVehicle(vehicle_name, type, registration_number, daily_rent_price, availability_status);

            return res.status(201).json({
                success: true,
                message: "Vehicle created successfully",
                data: vehicle
            });

        } catch (error: any) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: error.message || "Internal server vehicle create error"
            });
        };

    },

    getVehicles: async (req: Request, res: Response) => {
        try {
            const vehicles = await VehicleService.getVehicle();

            if (vehicles.length === 0) {
                return res.status(200).json({
                    success: true,
                    message: "No vehicles found",
                    data: []

                })
            };

            return res.status(200).json({
                success: true,
                message: "Vehicles retrieved successfully",
                data: vehicles
            });

        } catch (error: any) {

            console.log(error);

            return res.status(500).json({
                success: false,
                message: error.message || "Internal srver vehicles get error"
            });

        };
    },

    getVehicleById: async (req: Request, res: Response) => {

        try {
            const id = req.params.vehicleId as string;

            const vehicle = await VehicleService.getVehicleById(id);

            if (!vehicle) {

                return res.status(200).json({
                    success: true,
                    message: "Vehicles not found",

                });
            }

            return res.status(200).json({
                success: true,
                message: "Vehicle retrieved successfully",
                data: vehicle
            });

        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message || "Internal srver vehicles get error"
            });
        };

    },


    updateVehicle: async (req: Request, res: Response) => {

        try {
            const id = req.params.vehicleId as string;

            const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = req.body;

            const vehicle = await VehicleService.updateVehicle(vehicle_name, type, registration_number, daily_rent_price, availability_status, id);

            return res.status(200).json({
                success: true,
                message: "Vehicle updated successfully",
                data: vehicle
            });

        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message || "Internal srver vehicles update error"
            });
        }

    },

    deleteVehicle: async (req: Request, res: Response) => {
        try {
            const id = req.params.vehicleId as string;

            await VehicleService.deleteVehicle(id);

            return res.status(200).json({
                success: true,
                message: "Vehicle deleted successfully"
            });
            
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message || "Internal srver vehicles update error"
            });
        }

    }

};