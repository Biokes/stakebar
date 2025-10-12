import { UserController } from "../controller/user.controller";
import { userController } from ".";

const { Router } = require("express");

const userRouter = Router();
const user_controller: UserController = userController;
userRouter.post("/register",user_controller.register.bind(userController));
userRouter.patch("/verify/:email",user_controller.verify.bind(userController));

export { userRouter };
