import express from "express";
import config from "./config/config";
import { createTable } from "./config/table";
import authRouter from "./modules/auth/auth.route";
import vehicleRouter from "./modules/vehicle/vehicle.route";


const app = express();
const port = config.port;
 

app.use(express.json());


createTable();


app.use("/api/v1/auth", authRouter)
app.use("/api/v1/vehicles", vehicleRouter)

app.listen((port), async () => {
  console.log(`Example app listening on port ${port}`)
})