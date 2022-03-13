import express, { Express } from "express";
import helmet from "helmet";
import router from "./routes";

const app: Express = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

export default app;
