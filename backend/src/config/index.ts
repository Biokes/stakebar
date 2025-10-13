import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv = require("dotenv");
import { User } from "../data/models/user";
dotenv.config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST as string,
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DB as string,
  entities: [User],
  synchronize: true,
  logging: true,
});

export { AppDataSource };
