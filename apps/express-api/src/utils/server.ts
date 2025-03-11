import express from 'express';
import jsend from 'jsend';
import { Express } from 'express-serve-static-core';
import { connector, summarise, Controllers } from 'swagger-routes-express';
import { APISpec } from '@repo/openapi-spec';

export async function createServer(
  controllers: Controllers,
  openAPISpec: APISpec
): Promise<Express> {
  console.log(summarise(openAPISpec));

  const server = express();

  // Add jsend response formatting
  server.use(jsend.middleware);

  // Specify what type of request bodies the server can parse
  server.use(express.urlencoded({ extended: false }));
  server.use(express.json());
  server.use(express.text());

  // Autowire the controllers to the url paths in the OpenAPI specification - uses operationId
  const connect = connector(controllers, openAPISpec, {
    onCreateRoute: (method: string, descriptor) => {
      console.log(`${method}: ${descriptor[0]} - ${descriptor[1].name}`);
    }
  });

  connect(server);

  return server;
}
