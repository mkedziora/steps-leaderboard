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

export { registerControllers };

export type FastifyRequestTypebox<TSchema extends FastifySchema> =
  FastifyRequest<
    RouteGenericInterface,
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    TSchema,
    TypeBoxTypeProvider
  >;

const registerControllers = (app: FastifyInstance) => {
  registerStatusCheck(app);
};

const registerStatusCheck = (app: FastifyInstance) => {
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
    handler: async (req: FastifyRequest, reply: FastifyReply) =>
      reply.send({
        status: "OK",
        description: "All OK",
      }),
  });
};
