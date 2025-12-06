

export const VehicleModel = {
    createVehicle: `INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES ($1, $2, $3, $4, $5)
    RETURNING id, vehicle_name, type, registration_number, daily_rent_price, availability_status `,

    getVehicle: `SELECT * FROM vehicles`,

    getVehicleById: `SELECT * FROM vehicles WHERE id = $1`,

    updateVehicle: `UPDATE vehicles SET vehicle_name = $1, type = $2, registration_number = $3, daily_rent_price = $4, availability_status = $5 WHERE id = $6
      RETURNING id, vehicle_name, type, registration_number, daily_rent_price, availability_status`,

      deleteVehicle: `DELETE FROM vehicles WHERE id = $1`
}