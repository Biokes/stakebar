import { UserController } from "../controller/user.controller";
import { UserRepository } from "../data/repositories/users";
import { MailService } from "../services/mail.service";
import { UserService } from "../services/userService";
import { WhatsappController } from "../controller/whatsapp.controller";

const mailService = new MailService()
const userRepos: UserRepository = new UserRepository();
const userService: UserService = new UserService(userRepos, mailService);
const userController: UserController = new UserController(userService);
const whatsappController: WhatsappController = new WhatsappController();

export { userController, whatsappController }