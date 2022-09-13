import { Request, Response, NextFunction } from "express";
import authSchema from "../schemas/authSchema";

export default async function authValidation(req:Request, res:Response, next:NextFunction) {
    
    const { error } = authSchema.validate(req.body, {abortEarly:false});

    if(error) return res.status(422).send(error.details.map(detail => detail.message));

    next();
}