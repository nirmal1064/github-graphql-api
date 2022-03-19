import { Request, Response } from "express";
import app from "./app";

const PORT: number = Number(process.env.PORT) || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello from the TypeScript world!</h1>");
});

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT.toString()}`);
});
