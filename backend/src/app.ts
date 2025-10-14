const express = require("express");
const dotenv = require("dotenv");
import type { Response } from "express";
import { userRouter } from "./routes/user.route";
import { handleError } from "./middleware/advice";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/api/v2", (res: Response) => {
  res.json({ message: "YieldFi Backend is running 🚀" });
});
app.use("/users", userRouter)

app.use(handleError);

export { app };