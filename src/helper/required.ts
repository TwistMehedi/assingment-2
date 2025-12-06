import { Response } from "express";


export const required = ({...fields}, res:Response) =>{
     
    for(const field in fields){
        const key = field as keyof typeof fields;
         if(!fields[key]){
            return res.status(400).json({
                success: false,
                message: `${key} in required`
            })
         };
    };
};