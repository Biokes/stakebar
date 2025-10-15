import { userController } from "../config/context";
const { Router } = require("express");

const userRouter = Router();

userRouter.post("/register/:email",userController.register.bind(userController));
userRouter.patch("/verify/:email",userController.verify.bind(userController));
userRouter.get("/isVerified/:email",userController.isVerifiedEmail.bind(userController));
userRouter.get("/:email", userController.getUser.bind(userController))
userRouter.patch("/re-verify/:email", userController.reVerify.bind(userController))

export { userRouter };
