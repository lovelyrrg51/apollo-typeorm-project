import "reflect-metadata";
import * as TypeORM from "typeorm";
import { ApolloServer } from 'apollo-server';
import { buildSchema } from "type-graphql";
import { tracer } from "./tracer";

import * as db from "./database";

import { default as OpentracingExtension } from "apollo-opentracing";

async function serve() {

  const conn = await db.connection;

  TypeORM.BaseEntity.useConnection(conn);

  const schema = await buildSchema({
    resolvers: [__dirname + "/resolvers/**/*.js"],
  });

  const server = new ApolloServer({
    schema, playground: true, introspection: true,
    extensions: [
      () => new OpentracingExtension({
        server: tracer,
        local: tracer
      })
    ]
  });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  }).catch(console.log);
}

serve().catch(console.log);