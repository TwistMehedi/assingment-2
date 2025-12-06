import express from "express";
import config from "./config/config";
import { createTable } from "./config/table";
import authRouter from "./modules/auth/auth.route";


const app = express();
const port = config.port;
 

app.use(express.json());


createTable();


app.use("/api/v1/auth", authRouter)

app.listen((port), async () => {
  console.log(`Example app listening on port ${port}`)
})