import express,{ json } from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler";
import router from "./routes/router"

dotenv.config();

const app = express();

app.use(json());
app.use(cors());
app.use(router);
app.use(errorHandler);

const PORT:number = Number(process.env.PORT) || 5000;

app.listen(PORT,()=>console.log("Server online!"));