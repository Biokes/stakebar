import { userController } from "../config/context";

const { Router } = require("express");

const userRouter = Router();


userRouter.post("/register",userController.register.bind(userController));
userRouter.patch("/verify/:email",userController.verify.bind(userController));
userRouter.get("/isVerified/:email",userController.isVerifiedEmail.bind(userController));

export { userRouter };
