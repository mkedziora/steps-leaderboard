import { DataSource } from "typeorm";
import { Counter } from "./entities/Counter";
import { Team } from "./entities/Team";
import { User } from "./entities/User";

export { createDataSourceConnection };
const createDataSourceConnection = async () => {
  const dataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    logging: true,
    entities: [User, Counter, Team],
    subscribers: [],
  });
  await dataSource.initialize();
  return dataSource;
};
