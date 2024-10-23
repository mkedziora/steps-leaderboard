import { FastifyInstance } from "fastify";
import { setupApp } from "./app";
import dotenv from "dotenv";

dotenv.config();

void main();

async function main() {
  const app: FastifyInstance = await setupApp();

  app.listen({ port: 8080 });
}
