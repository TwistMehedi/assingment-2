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

    CREATE TABLE IF NOT EXISTS vehicles (
    id SERIAL PRIMARY KEY,
    vehicle_name VARCHAR(30) NOT NULL,
    type VARCHAR(10) NOT NULL CHECK (type IN ('car', 'bike', 'van', 'SUV')),
    registration_number VARCHAR(50) NOT NULL UNIQUE,
    daily_rent_price NUMERIC(10,2) NOT NULL CHECK (daily_rent_price > 0),
    availability_status VARCHAR(10) NOT NULL DEFAULT 'available' CHECK (availability_status IN ('available', 'booked')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    vehicle_id INT NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    rent_start_date  DATE NOT NULL,
    rent_end_date DATE NOT NULL,
    total_price NUMERIC(10, 2) NOT NULL CHECK (total_price > 0),
    status VARCHAR(20) NOT NULL CHECK (status IN ('active', 'cancelled', 'returned')),
    created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  console.log("Users table created or already exists.");
};

createTable().catch(err => console.error("DB Table Init Error:", err));
