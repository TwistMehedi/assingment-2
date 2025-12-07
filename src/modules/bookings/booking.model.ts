

export const BookingModel = {

    createBokking: `INSERT INTO bookings (
        customer_id,
        vehicle_id,
        rent_start_date,
        rent_end_date,
        total_price,
        status
    ) VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,

    getBooking: `SELECT * FROM bookings WHERE id = $1`,

    updateStatus: `UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *`,

    activeBooking: `SELECT id FROM bookings WHERE vehicle_id = $1 AND status = 'active'`

}