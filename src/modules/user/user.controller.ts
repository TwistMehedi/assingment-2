import { Request, Response } from "express";
import { UserService } from "./user.service";


export const UserController = {

    users: async(req: Request, res:Response)=>{
        try {
            
            const users = await UserService.users();

            return res.status(200).json({
                success: true,
                message: "Users retrieved successfully",
                data: users
            });

        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message || "Internal server users fetch error"
            })
        }
    },

    updateUser: async(req: Request, res: Response)=>{

        const id = req.params.userId as string;

        const loginUser = req.user;

        if(!loginUser){
            return res.status(401).json({ success: false, message: "Unauthorized" });
        };


         const { name, email, phone, role} = req.body;


        
            if (loginUser.role !== "admin" && loginUser.id !== id) {
                return res.status(403).json({ success: false, message: "Forbidden: Cannot update other users' profiles" });
            };

             const updatedData: any = { name, email, phone };

            if (loginUser.role === "admin") {
                updatedData.role = role;
            };

            const updatedUser = await UserService.updateUser(id, updatedData);
    
            return res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: updatedUser
            });
    },

    deleteUser: async(req:Request, res:Response)=>{
        try {
            
            const id = req.params.userId as string;

              await UserService.deleteUser(id)

             return res.status(200).json({
                success: true,
                message: "User deleted successfully",
            });

        } catch (error: any) {
             return res.status(500).json({
                success: false,
                message:  error.message || "Internal server user delete error",
            });
        }
    }
}