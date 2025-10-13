import { UserRepository } from "../data/repositories/users";
import { YeildFiException } from "../exception/index.error";
import { MailService } from "./mail.service";

class UserService {
    private userRepository: UserRepository
    private readonly mailService: MailService;
    constructor(userRepository: UserRepository, mailService: MailService) {
        this.userRepository = userRepository;
        this.mailService = mailService;
    }

    public async createUser(email: string) {
        const user = this.userRepository.findByEmail(email);
        if (user == null) { 
            this.userRepository.create(email);
            this.mailService.sendWelcomeEmail(email)
            return;
        }
        throw new YeildFiException("Email already exist",email+" is already used by another user")
    }

  public async getUserByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }
}

export { UserService };
