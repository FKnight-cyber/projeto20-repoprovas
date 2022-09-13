import * as testMethods from "../repositories/testRepository";
import { TestData } from "../types/testType";
import { verifyError } from "../middlewares/errorHandler";
import { findCategoryById } from "../repositories/categoriesRepository";
import { findTeacherDisciplineById } from "../repositories/disciplineRepository";

export async function addTest(name:string, 
    pdfUrl:string, 
    categoryId:number, 
    teacherDisciplineId:number){

        const checkTest = await testMethods.findTestByName(name);
        if(checkTest) throw verifyError(401,"There's already a test registered with this name!");

        const category = await findCategoryById(categoryId);
        if(!category) throw verifyError(404,"This category wasn't registered!");

        const teacher = await findTeacherDisciplineById(teacherDisciplineId);
        if(!teacher) throw verifyError(404,"There's no teacher registered with this ID!");

        const test:TestData = {
            name,
            pdfUrl,
            categoryId,
            teacherDisciplineId
        }

        await testMethods.addTest(test).catch(()=>{
            verifyError(500,"Database error, couldn't insert test data!")
        });
    }