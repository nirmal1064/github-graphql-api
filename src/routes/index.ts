import { AxiosRequestConfig } from "axios";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { getRequest, postRequest } from "../api";
import {
  GITHUB_API_AUTH,
  OAUTHACCESSURL,
  USERAPIENDPOINT
} from "../utils/constants";
dotenv.config();

const router = express.Router();
const clientId = process.env.CLIENTID;
const clientSecret = process.env.CLIENTSECRET;
let token = "";

router.get("/home", (req: Request, res: Response) => {
  res.json({ msg: "Hello from the TypeScript world!" });
});

router.get("/login", (req: Request, res: Response) => {
  const url = `${GITHUB_API_AUTH}?client_id=${clientId}&scope=repo`;
  res.redirect(url);
});

router.get("/callback", (req: Request, res: Response) => {
  const body = {
    client_id: clientId,
    client_secret: clientSecret,
    code: req.query.code
  };
  const opts = { headers: { accept: "application/json" } };
  const response: any = postRequest(OAUTHACCESSURL, body, opts);
  if (response) {
    token = response["access_token"];
    res.json({ token });
  } else {
    res.status(500).json({ message: "Error" });
  }
});

router.get("/user", async (req: Request, res: Response) => {
  const response = await getRequest(USERAPIENDPOINT, getHeaders());
  if (response) {
    res.json(response);
  } else {
    res.status(500).json({ message: "Error" });
  }
});

const getHeaders = (): AxiosRequestConfig => {
  return {
    headers: { accept: "application/json", Authorization: `token ${token}` }
  };
};

export default router;
