import pool from "./database";

export const createTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(20) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(100) NOT NULL,
      phone VARCHAR(20) NOT NULL,
      role VARCHAR(10) DEFAULT 'customer' CHECK (role IN ('admin', 'customer')),
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  console.log("Users table created or already exists.");
};
