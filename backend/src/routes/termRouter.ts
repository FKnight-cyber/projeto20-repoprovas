import { Router } from "express";
import authorization from "../middlewares/authorization";
import { getTerms } from "../controllers/termController";

const termRouter = Router();

termRouter.get('/terms',authorization, getTerms);

export default termRouter;