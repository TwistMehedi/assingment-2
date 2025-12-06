import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";


export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {

    try {
        const token = req.headers.authorization?.split(" ")[1];
        
        if(!token){
            return res.status(401).json({
                success: false,
                message: "You are unathorized"
            })
        };

        const decoded = jwt.verify(token, config.jwt_secrek_key as string) as JwtPayload;

        req.user = decoded,

        next();

    } catch (error) {
        console.log(error);
    };
};


export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {

    const userRole = req.user?.role;

    if (!userRole) {
      return res.status(401).json({ message: "User role missing in request" });
    }

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        message: `Access denied for role '${allowedRoles.join(", ")}'. Allowed roles: ${userRole}`,
      });
    }

    next();
  };
};