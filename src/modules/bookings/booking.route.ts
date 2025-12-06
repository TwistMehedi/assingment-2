

import express from "express";
import { isAuthenticated } from "../../middleware/middleware";
import { BookingController } from "./booking.controller";

const router = express.Router();

router.post("/", isAuthenticated, BookingController.createBooking)
router.get("/", isAuthenticated, BookingController.getBookings)
router.put("/:bookingId", isAuthenticated, BookingController.bookingStatus)

export default router;