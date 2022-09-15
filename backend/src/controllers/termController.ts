import { Request, Response } from "express";
import * as termService from "../services/termService"

export async function getTerms(req:Request, res:Response){
    const terms = await termService.getTerms();

    res.status(200).send(terms);
}