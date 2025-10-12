const express = require("express");
const dotenv = require("dotenv");
const emailRouter = require("./routes/email")
import type { Response } from "express";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (res: Response) => {
  res.json({ message: "YieldFi Backend is running 🚀" });
});
app.post("/email/", emailRouter)
module.exports = app;