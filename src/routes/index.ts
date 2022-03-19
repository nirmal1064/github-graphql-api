import axios, { AxiosRequestConfig } from "axios";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
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

const getHeaders = (): AxiosRequestConfig => {
  return {
    headers: { accept: "application/json", Authorization: `token ${token}` }
  };
};

router.get("/home", (req: Request, res: Response) => {
  res.json({ msg: "Hello from the TypeScript world!" });
});

router.get("/login", (req: Request, res: Response) => {
  const url = `${GITHUB_API_AUTH}?client_id=${clientId}&scope=repo`;
  res.redirect(url);
});

router.get("/callback", async (req: Request, res: Response) => {
  const body = {
    client_id: clientId,
    client_secret: clientSecret,
    code: req.query.code
  };
  const opts = { headers: { accept: "application/json" } };
  try {
    const response = (await axios.post(OAUTHACCESSURL, body, opts)).data;
    token = response["access_token"];
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

router.get("/user", async (req: Request, res: Response) => {
  const response = (await axios.get(USERAPIENDPOINT, getHeaders())).data;
  if (response) {
    res.json(response);
  } else {
    res.status(500).json({ message: "Error" });
  }
});

export default router;
