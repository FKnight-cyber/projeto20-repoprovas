import { Router } from "express";
import authRouter from "./authRouter";
import testRouter from "./testRouter";
import termRouter from "./termRouter";
import disciplineRouter from "./disciplineRouter";

const router = Router();

router.use(authRouter);
router.use(testRouter);
router.use(termRouter);
router.use(disciplineRouter);

export default router;