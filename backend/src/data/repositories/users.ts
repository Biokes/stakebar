import { User } from "../../generated/prisma";

class UserRepository {
  async create(email: string): Promise<User> {
    return prisma.user.create({
      data: {
        email: email,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });
  }
  async verifyEmail(email: string): Promise<User> {
    const user = await prisma.user.update({
      where: { email },
      data: {
        isVerified: true,
        updatedAt: new Date(),
      },
    });
    return user;
  }
}

export { UserRepository };
