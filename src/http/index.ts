import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  FastifySchema,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteGenericInterface,
} from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";
import { DataSource } from "typeorm";
import { registerCounterControllers } from "./counters";

export { registerControllers };

export type FastifyRequestTypebox<TSchema extends FastifySchema> =
  FastifyRequest<
    RouteGenericInterface,
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    TSchema,
    TypeBoxTypeProvider
  >;

const registerControllers =
  (app: FastifyInstance) =>
  ({ dbDataSource }: { dbDataSource: DataSource }) => {
    registerStatusCheck(app)({ dbDataSource });
    registerCounterControllers(app)({ dbDataSource });
  };

const registerStatusCheck =
  (app: FastifyInstance) =>
  ({ dbDataSource }: { dbDataSource: DataSource }) => {
    app.withTypeProvider<TypeBoxTypeProvider>().route({
      method: "GET",
      url: "/status",
      schema: {
        description: "Status check",
        summary: "Check state of the application",
        tags: ["health"],
        response: {
          200: Type.Object({
            status: Type.String(),
            description: Type.String(),
          }),
          503: Type.Object({
            status: Type.String(),
            description: Type.String(),
          }),
        },
      },
      handler: async (req: FastifyRequest, reply: FastifyReply) => {
        try {
          await dbDataSource.query("SELECT 1");
          return reply.send({
            status: "OK",
            description: "All OK",
          });
        } catch (err) {
          const cause = err instanceof Error ? err.message : "Unknown error";
          return reply.send({
            status: "FAILED",
            description: "Database connection error, cause: " + cause,
          });
        }
      },
    });
  };
