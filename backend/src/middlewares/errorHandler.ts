import { Request, Response, NextFunction } from "express";

export default async function errorHandler(error:any, req:Request, res:Response, next:NextFunction){
    return res.status(error.status).send(error.message);
}

export function verifyError(status:number, message:string) {
    return {
        status,
        message
    }
}