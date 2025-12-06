
import express from "express";
import { authorizeRoles, isAuthenticated } from "../../middleware/middleware";
import { VehicleController } from "./vehicle.controller";

const router = express.Router();

router.post("/", isAuthenticated, authorizeRoles("admin"), VehicleController.createVehicle);
router.get("/", VehicleController.getVehicles);
router.get("/:vehicleId", VehicleController.getVehicleById);
router.put("/:vehicleId", isAuthenticated, authorizeRoles("admin"), VehicleController.updateVehicle);
router.delete("/:vehicleId", isAuthenticated, authorizeRoles("admin"), VehicleController.deleteVehicle);

export default router;