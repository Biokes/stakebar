import 'dotenv/config';
import "reflect-metadata"
import { app } from "./app";
import { AppDataSource } from './config';

const PORT = process.env.PORT;

async function startServer() {
  try {
    await AppDataSource.initialize()
    console.log('Connected to AppDataSource');
  } catch (error) {
    console.error('Could not connect to database: ', error);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startServer();