import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { required } from "../../helper/required";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config/config";


export const AuthController = {
    
    createUser: async (req: Request, res: Response) => {
        try {
            const { name, email, password, phone, role } = req.body;

            required({ name, email, password, phone }, res);

            const hashedPassword = await bcrypt.hash(password, 10);

            const createUser = await AuthService.signup(name, email, hashedPassword, phone, role)

            return res.status(201).json({
                success: true,
                message: "User registered successfully",
                data: createUser
            });

        } catch (error: any) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: error.message || "Internal server login error"
            });
        };
    },

    signin: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            required({ email, password }, res);

            const user = await AuthService.signin(email, password);


            const token = jwt.sign(
                { id: user.id, role: user.role },
                config.jwt_secrek_key as string,
                { expiresIn: "1d" }
            );

            return res.status(200).json({
                success: true,
                message: "Login successful",
                data: {
                    token,
                    user
                }
            });

        } catch (error: any) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: error.message || "Internal server login error"
            })
        }
    }


};