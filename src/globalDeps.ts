import { createDataSourceConnection } from "./db/dataSource";

export { globalDepsFactory };
const globalDepsFactory = async () => {
  const dataSource = await initializeDb();
  return {
    dbDataSource: dataSource,
  };
};

const initializeDb = async () => {
  return createDataSourceConnection();
};
