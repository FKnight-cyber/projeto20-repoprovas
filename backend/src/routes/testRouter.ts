import { Router } from "express";
import testValidation from "../middlewares/testValidation";
import authorization from "../middlewares/authorization";
import { newTest } from "../controllers/testController";

const testRouter = Router();

testRouter.post('/test/new', testValidation, authorization, newTest);

export default testRouter;