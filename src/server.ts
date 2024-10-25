import "reflect-metadata";
import { FastifyInstance } from "fastify";
import { setupApp } from "./app";
import dotenv from "dotenv";
import { globalDepsFactory } from "./globalDeps";

dotenv.config();

void main();

async function main() {
  const globalDeps = await globalDepsFactory();
  const app: FastifyInstance = await setupApp(globalDeps);

  app.listen({ port: 8080 });
}
