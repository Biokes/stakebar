import { app } from "./app";
import { PrismaClient } from "./generated/prisma";

const PORT = process.env.PORT;
const prisma = new PrismaClient();

async function startServer() {
  try {
    await prisma.$connect();
    console.log('✅ Connected to PostgreSQL');
  } catch (error) {
    console.error('❌ Could not connect to database:', error);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
  });
}

startServer();