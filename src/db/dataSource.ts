import { DataSource, DataSourceOptions } from "typeorm";
import { Counter } from "./entities/Counter";
import { Team } from "./entities/Team";
import { User } from "./entities/User";
import { SeederOptions } from "typeorm-extension";
import { CountersFactory } from "./seeds/factories/counters.factory";
import { TeamsFactory } from "./seeds/factories/teams.factory";
import { UsersFactory } from "./seeds/factories/users.factory";
import MainSeeder from "./seeds/main.seeder";

export { createDataSourceConnection };
const createDataSourceConnection = async () => {
  const {
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_NAME,
  } = process.env;

  const dbOptions: DataSourceOptions & SeederOptions = {
    type: "postgres",
    host: DATABASE_HOST || "localhost",
    port: Number(DATABASE_PORT) || 5432,
    username: DATABASE_USER || "postgres",
    password: DATABASE_PASSWORD || "postgres",
    database: DATABASE_NAME || "test",
    synchronize: true,
    logging: true,
    entities: [User, Counter, Team],
    subscribers: [],
    factories: [UsersFactory, CountersFactory, TeamsFactory],
    seeds: [MainSeeder],
  };

  const dataSource = new DataSource(dbOptions);
  await dataSource.initialize();
  return dataSource;
};
