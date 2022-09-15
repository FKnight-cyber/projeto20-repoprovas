import { Request, Response } from "express";
import * as disciplineService from "../services/disciplineService";

export async function getDisciplinesByTermId(req:Request, res:Response){
    const id:number  = Number(req.params.id);

    const disciplines = await disciplineService.getDisciplinesByTermId(id);

    return res.status(200).send(disciplines);
}