import { Request, Response } from "express";
import * as authServices from "../services/authService"

export async function signUp(req:Request, res:Response){

    const { email, password, confirmPass} : 
    { email:string, password:string, confirmPass:string } = req.body;

    await authServices.signUp(email,password,confirmPass);

    res.status(201).send({message:"User successfully registered!"});
}

export async function signIn(req:Request, res:Response){
    const { email, password, confirmPass} : 
    { email:string, password:string, confirmPass:string } = req.body;

    const userInfo = await authServices.signIn(email,password,confirmPass);

    res.status(200).send(userInfo);
}