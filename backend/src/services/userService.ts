import { UserDTO } from "../data/models";
import { UserRepository } from "../data/repositories/users";
import { YeildFiException } from "../exception/index.error";
import { MailService } from "./mail.service";

class UserService {
  private userRepository: UserRepository;
  private readonly mailService: MailService;
  constructor(userRepository: UserRepository, mailService: MailService) {
    this.userRepository = userRepository;
    this.mailService = mailService;
  }

  public async createUser(email: string) {
    const user = this.userRepository.findByEmail(email);
    if (user == null) {
      this.userRepository.create(email);
      this.mailService.sendWelcomeEmail(email);
      return;
    }
    throw new YeildFiException("Email already exist");
  }

  public async getUserByEmail(email: string): Promise<UserDTO> {
    const userFound = await this.userRepository.findByEmail(email);
    if (userFound == null) throw new YeildFiException("user not found");
    const returnValue: UserDTO = {
      email: userFound.email,
      isVerified: userFound.isVerified,
      id: userFound.id,
    };
    return returnValue;
  }
}

export { UserService };
