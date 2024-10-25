import { FastifyInstance } from "fastify";
import { registerCreateCounterController } from "./createCounter/createCounter.ctrl";
import { DataSource } from "typeorm";

export { registerCounterControllers };
const registerCounterControllers =
  (app: FastifyInstance) =>
  ({ dbDataSource }: { dbDataSource: DataSource }) => {
    registerCreateCounterController(app)({ dbDataSource });
  };
