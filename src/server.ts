import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { router } from "./routes";

import "./database";
import { createConnection } from "typeorm";

dotenv.config(); // Env vars setup

createConnection().then(async connection => {

const app = express();
app.use(cors());

app.use(express.json());

app.use(router);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof Error) {
        return response.status(400).json({ error: err.message });
    }

    return response.status(500).json({ 
        status: "error",
        message: "Interal Server Error"
    });
});

app.listen(process.env.PORT || 3000, () => { console.log("Server Up!") });

}).catch(error => console.log("Data Access Error : ", error));

