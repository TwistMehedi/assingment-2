import express from "express";
import authRouter from "./modules/auth/auth.route";
import vehicleRouter from "./modules/vehicle/vehicle.route";
import userRouter from "./modules/user/user.route";
import bookingRouter from "./modules/bookings/booking.route";
 import "./modules/cron/bookingCron";
import config from "./config/config";

const app = express();

const port = config.port;

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/vehicles", vehicleRouter);
0
app.use("/api/v1/users", userRouter);
app.use("/api/v1/bookings", bookingRouter);
 
app.listen(port,()=>{
    console.log(`Server is running port number ${port}`)
})
