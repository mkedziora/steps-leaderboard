import { Type, TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { FastifyInstance, FastifyReply } from "fastify";
import { FastifyRequestTypebox } from "../..";
import { DataSource } from "typeorm";
import { createCounter } from "../../../domain/counters/counter";

export { registerCreateCounterController };

const registerCreateCounterController =
  (app: FastifyInstance) =>
  ({ dbDataSource }: { dbDataSource: DataSource }) => {
    app.withTypeProvider<TypeBoxTypeProvider>().route({
      method: "POST",
      url: "/counters",
      schema: createCounterSchema,
      handler: async (
        req: FastifyRequestTypebox<typeof createCounterSchema>,
        reply: FastifyReply
      ) => {
        const { data } = req.body;
        try {
          const counter = await createCounter({
            entityManager: dbDataSource.manager,
          })(data);
          return reply.status(201).send(counter);
        } catch (err) {
          const cause = err instanceof Error ? err.cause || err?.message : "unkown error";
          if (cause === "user not found") {
            return reply.status(404).send({
              message: "User not found",
            });
          }
          return reply.status(500).send({
            message: "Erorr while creating counter",
            cause,
          });
        }
      },
    });
  };

const createCounterSchema = {
  description: "Creates new counter",
  summary:
    "Takes required counter payload and saves new counter into the database",
  tags: ["counter"],
  body: Type.Object({
    data: Type.Object({
      value: Type.Number(),
      userId: Type.String(),
    }),
  }),
};
