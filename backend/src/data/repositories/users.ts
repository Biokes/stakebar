// import type models = require("../models");

class UserRepository {
  async create(email: string) {
    return prisma.user.create({
      data: {
        email: email,
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });
  }
}

export { UserRepository };
