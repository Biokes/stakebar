import { UserDTO } from "./../data/models/index";
import { UserRepository } from "../data/repositories/users";
import { YeildFiException } from "../exception/index.error";
// import { User } from "../data/models/user";
import { MailService } from "./mail.service";

class UserService {
  private readonly userRepository: UserRepository;
  private readonly mailService: MailService;

  constructor(userRepository: UserRepository, mailService: MailService) {
    this.userRepository = userRepository;
    this.mailService = mailService;
  }

   async createUser(email: string): Promise<UserDTO> {
    const normalized = email.toLowerCase();
    const existing = await this.userRepository.findByEmail(normalized);
    if (existing) throw new YeildFiException("Email already exists");
    const createdUser = await this.userRepository.create(normalized);
    await this.mailService.sendWelcomeEmail(normalized);
    return {
      id: createdUser.id,
      email: createdUser.email,
      isVerified: createdUser.isVerified,
    };
  }

   async getUserByEmail(email: string): Promise<UserDTO> {
    const userFound = await this.userRepository.findByEmail(email);
    if (!userFound) throw new YeildFiException("user not found");
    const returnValue: UserDTO = {
      email: userFound.email,
      isVerified: userFound.isVerified,
      id: userFound.id,
    };
    return returnValue;
  }

   async verify(email: string): Promise<UserDTO> {
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

   async reVerify(email: string): Promise<void> {
    const normalizedEmail = email.toLowerCase();
    const user = await this.userRepository.findByEmail(normalizedEmail);
    if (!user) throw new YeildFiException("User not found");
    if (user.isVerified) throw new YeildFiException("User already verified");
    await this.mailService.sendVerificationMail(normalizedEmail);
  }

   async isVerifiedEmail(email: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    return !!user && user.isVerified;
  }
}

export { UserService };
