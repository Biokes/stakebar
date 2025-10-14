const express = require("express");
const dotenv = require("dotenv");
import type { Response } from "express";
import { userRouter } from "./routes/user.route";
import { handleError } from "./middleware/advice";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/api/v1", (req: Request, res: Response) => {
  console .log("testing main: {===", req," ===}")
  res.status(200).json({ message: "YieldFi Backend is running 🚀" });
});
app.use("/users", userRouter)

app.use(handleError);

export { app };