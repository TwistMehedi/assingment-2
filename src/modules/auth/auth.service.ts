import pool from "../../config/database";
import { AuthModel } from "./auth.model";
import bcrypt from "bcryptjs";

export const AuthService = {
    signup: async (name: string, email: string, password: string, phone: string, role: string) => {
        const result = await pool.query(AuthModel.createUser, [name, email, password, phone, role]);
        return result.rows[0];
    },

    signin: async (email: string, password: string,) => {
        const result = await pool.query(AuthModel.signin, [email]);

        if (result.rows.length === 0) {
           throw new Error("Invalid email or password");
        }

        const user = result.rows[0];

        const isMatchPassword = await bcrypt.compare(password, user.password);

        if (!isMatchPassword) {
            throw new Error("Invalid email or password");
        };

        delete user.password;

        return user;

    }
};