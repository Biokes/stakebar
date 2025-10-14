import { UserDTO } from "./../data/models/index";
import { UserRepository } from "../data/repositories/users";
import { YeildFiException } from "../exception/index.error";
import { User } from "../data/models/user";
import { MailService } from "./mail.service";

class UserService {
  private readonly userRepository: UserRepository;
  private readonly mailService: MailService;

  constructor(userRepository: UserRepository, mailService: MailService) {
    this.userRepository = userRepository;
    this.mailService = mailService;
  }

  public async createUser(email: string): Promise<UserDTO> {
    const user = await this.userRepository.findByEmail(email.toLowerCase());
    if (!user) {
      const createdUser: User = await this.userRepository.create(
        email.toLowerCase()
      );
      await this.mailService.sendWelcomeEmail(email);
      const userDTO: UserDTO = {
        isVerified: createdUser.isVerified,
        id: createdUser.id,
        email: createdUser.email,
      };
      return userDTO;
    }
    throw new YeildFiException("Email already exist");
  }

  public async getUserByEmail(email: string): Promise<UserDTO> {
    const userFound = await this.userRepository.findByEmail(email);
    if (!userFound) throw new YeildFiException("user not found");
    const returnValue: UserDTO = {
      email: userFound.email,
      isVerified: userFound.isVerified,
      id: userFound.id,
    };
    return returnValue;
  }

  public async verify(email: string): Promise<UserDTO> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new YeildFiException("Email does not Exist");
    if (user.isVerified) throw new YeildFiException("User already verified");
    const updatedUser = await this.userRepository.verifyEmail(email);
    const returnValue: UserDTO = {
      email: updatedUser.email,
      isVerified: updatedUser.isVerified,
      id: updatedUser.id,
    };
    return returnValue;
  }

  public async isVerifiedEmail(email: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    return !user || !user.isVerified;

  }
}

export { UserService };
