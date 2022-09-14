import { Request, Response } from "express";
import * as testService from "../services/testService";

export async function newTest(req:Request, res:Response){
    const { name, pdfUrl, categoryId, teacherDisciplineId } :
    {   name:string, 
        pdfUrl:string, 
        categoryId:number, 
        teacherDisciplineId:number } = req.body;

    await testService.addTest(name, pdfUrl, categoryId, teacherDisciplineId);
    
    res.status(201).send({message:"Test added!"});
};

export async function disciplineTests(req:Request, res:Response){
    const tests = await testService.testsByDiscipline();

    res.status(200).send(tests);
};

export async function teacherTests(req:Request, res:Response){
    const tests = await testService.testsByTeacher();

    res.status(200).send(tests);
};