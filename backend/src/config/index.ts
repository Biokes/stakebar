import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../data/models/user";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port:Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.DATABASE_NAME
,
  entities: [User],
  synchronize: true,
  logging: "all",
});

export { AppDataSource };
