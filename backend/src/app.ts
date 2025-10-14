const express = require("express");
const dotenv = require("dotenv");
import type { Response } from "express";
import { userRouter } from "./routes/user.route";
import { handleError } from "./middleware/advice";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req: Request, res: Response) => {
  console.log("testing main: ", req);
  res.status(200).json({ message: "YieldFi Backend is running 🚀" });
});

app.use("/api/v1/users", userRouter);

app.use(handleError);

export { app };
