import { DataSource } from "typeorm";

export { globalDepsFactory };
const globalDepsFactory = async () => {
  const dataSource = await createDataSourceConnection();
  return {
    dbDataSource: dataSource,
  };
};

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
    entities: [],
    subscribers: [],
    migrations: [],
  });
  await dataSource.initialize();
  return dataSource;
};
