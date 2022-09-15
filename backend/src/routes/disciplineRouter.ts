import { Router } from "express";
import authorization from "../middlewares/authorization";
import { getDisciplinesByTermId } from "../controllers/disciplineController";

const disciplineRouter = Router();

disciplineRouter.get("/terms/:id", authorization, getDisciplinesByTermId);

export default disciplineRouter;