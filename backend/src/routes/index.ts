import { UserController } from "../controller/user.controller";
import { UserRepository } from "../data/repositories/users";
import { UserService } from "../services/userService";

const userRepos: UserRepository = new UserRepository();
const userService: UserService = new UserService(userRepos);
const userController: UserController = new UserController(userService);

export { userController }