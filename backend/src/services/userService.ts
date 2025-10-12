import { UserRepository } from "../data/repositories/users";

class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async createUser(email: string) {
    return this.userRepository.create(email);
  }

  public async getUserByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }
}

export { UserService };