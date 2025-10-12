import type models = require("../models");

class UserRepository {

  async create(registerDto: models.RegisterDTO) {
    return prisma.user.create({ registerDto });
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


module.exports = { UserRepository };
