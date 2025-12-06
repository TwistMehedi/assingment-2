import pool from "../../config/database"
import { UserModel } from "./user.model"


export const UserService = {

    users: async () => {

        const users = await pool.query(UserModel.users);
        return users.rows;
    },

    updateUser: async (id: string, updatedData: { name?: string; email?: string; phone?: string; role?: string }) => {

        const fields = Object.keys(updatedData);
        const values = Object.values(updatedData);

        const setQuery = fields.map((field, index) => `${field}=$${index + 1}`).join(", ");

        const query = `
            UPDATE users
            SET ${setQuery}
            WHERE id=$${fields.length + 1}
            RETURNING id, name, email, phone, role
        `;

        const result = await pool.query(query, [...values, id]);

        return result.rows[0];

    },

    deleteUser: async(id: string) => {

        const user = await pool.query(UserModel.deleteUser, [id]);

        return user.rows;
    }

}