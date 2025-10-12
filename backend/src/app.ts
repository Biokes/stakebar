const express = require("express");
const dotenv = require("dotenv");
import type { Response } from "express";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (res: Response) => {
  res.json({ message: "YieldFi Backend is running 🚀" });
});

module.exports = app;