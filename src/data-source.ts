import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "senhaforte",
  database: "minha_api_crud",
  synchronize: false,
  logging: true,
  entities: [User],
  migrations: ["src/migrations/*.ts"],
  subscribers: []
});