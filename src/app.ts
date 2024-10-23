import fastifySwagger from "@fastify/swagger";
import fastify, { FastifyInstance } from "fastify";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { registerControllers } from "./http";

export { setupApp };

const setupApp = async () => {
  const app = fastify({
    logger: {
      level: "info",
      transport: {
        target: "pino-pretty",
      },
      serializers: {
        res(res) {
          return {
            statusCode: res.statusCode,
          };
        },
        req(req) {
          return {
            method: req.method,
            url: req.url,
            headers: req.headers,
          };
        },
      },
    },
  });

  app.addHook("preHandler", function (req, reply, done) {
    if (req.body) {
      req.log.info({ body: req.body }, "parsed body");
    }
    done();
  });

  await registerPlugins(app);

  registerControllers(app);

  return app;
};

const registerPlugins = async (app: FastifyInstance) => {
  await registerSwagger(app);
  await registerSwaggerUi(app);
};

const registerSwagger = async (app: FastifyInstance) => {
  await app.register(fastifySwagger, {
    openapi: {
      openapi: "3.0.0",
      info: {
        title: "Steps leaderboard API",
        description: "API for steps leaderboard management",
        version: "0.1.0",
      },
      servers: [
        {
          url: "http://localhost:8080",
          description: "Development server",
        },
      ],
      tags: [
        { name: "health", description: "Status check related end-points" },
      ],
    },
  });
};

const registerSwaggerUi = async (app: FastifyInstance) => {
  await app.register(fastifySwaggerUi, {
    routePrefix: "/documentation",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformSpecificationClone: true,
  });
};
