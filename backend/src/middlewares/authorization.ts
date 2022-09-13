import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { verifyError } from "../middlewares/errorHandler";

dotenv.config();

export default function authorization(req:Request, res:Response, next:NextFunction){
    const token:string = req.headers['x-access-token'].toString();

    if(!token) throw verifyError(401,"You didn't sent validation token!");

    try {
        const userInfo = jwt.verify(token,process.env.JWT_SECRET);
        res.locals.userInfo = userInfo;
        next();
    } catch (error) {
        return res.status(401).send("Invalid token!")
    }
}