const { PrismaClient } = require("@prisma/client");

declare global {
  var prisma: InstanceType<typeof PrismaClient> | undefined;
}

const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query", "warn", "error"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

module.exports = { prisma };