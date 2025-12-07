import { Pool } from "pg";
import config from "./config";


const pool = new Pool({
    connectionString: config.database_string,
    ssl: {
    rejectUnauthorized: false
  }
});

pool.connect()
  .then(() => {
    console.log("📌 PostgreSQL connected");
  })
  .catch((err) => {
    console.error("❌ PostgreSQL connection failed:", err.message);
  });

  

export default pool;
