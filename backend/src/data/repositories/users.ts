import { Repository } from "typeorm";
import { User } from "../models/user";
import { AppDataSource } from "../../config";
import { YeildFiException } from "../../exception/index.error";

class UserRepository {
  private readonly repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create(email: string): Promise<User> {
    try {
      const user = this.repository.create({ 
        email,
        isVerified: false
      });
      return await this.repository.save(user);
    } catch (error: any) {
      if (error?.code === '23505') {
        throw new YeildFiException("Email already exists");
      }
      throw new YeildFiException("Failed to create user");
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({ 
      where: { email },
      select: ['id', 'email', 'isVerified', 'createdAt', 'updatedAt']
    });
  }

  async verifyEmail(email: string): Promise<User> {
    const user = await this.findByEmail(email);
    if (!user) throw new YeildFiException("User not found");
    user.isVerified = true;
    return await this.repository.save(user);
  }
}

export { UserRepository };
