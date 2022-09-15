import { Router } from "express";
import testValidation from "../middlewares/testValidation";
import authorization from "../middlewares/authorization";
import { newTest,
    disciplineTests,
    teacherTests } from "../controllers/testController";

const testRouter = Router();

testRouter.post('/test/new', testValidation, authorization, newTest);
testRouter.get('/disciplines/:id/tests',authorization, disciplineTests);
testRouter.get('/teachers/:id/tests',authorization, teacherTests);

export default testRouter;