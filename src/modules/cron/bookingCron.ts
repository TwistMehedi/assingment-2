import cron from "node-cron";
import pool from "../../config/database";
 
 cron.schedule("* * * * *", async () => {
    try {
           await pool.query(`
            UPDATE vehicles
            SET availability_status = 'available'
            WHERE id IN (
                SELECT vehicle_id
                FROM bookings
                WHERE rent_end_date < NOW()
                AND status = 'active'
            )
        `);

        await pool.query(`
            UPDATE bookings
            SET status = 'returned'
            WHERE rent_end_date < NOW()
            AND status = 'active'
        `);
 

    } catch (error) {
        console.error("Cron job error:", error);
    }
});
