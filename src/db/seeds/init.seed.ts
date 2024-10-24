import { runSeeders } from "typeorm-extension";
import { createDataSourceConnection } from "../dataSource";
import dotenv from "dotenv";

dotenv.config();

const runSeeder = async () => {
  const dataSource = await createDataSourceConnection();
  await runSeeders(dataSource);
};

runSeeder();
