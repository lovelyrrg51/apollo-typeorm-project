import "reflect-metadata";

import * as functions from 'firebase-functions';
import { buildSchemaSync } from "type-graphql";
import { ApolloServer } from 'apollo-server-cloud-functions';
import * as db from "./database";
import { BaseEntity } from "typeorm";


async function init() {
  const conn = await db.connection;

  BaseEntity.useConnection(conn);
}

const schema = buildSchemaSync({
  resolvers: [__dirname + "/resolvers/**/*.js"],
});

const server = new ApolloServer({
  schema,
  playground: true,
  introspection: true,
  context: ({ req, res }) => ({
    headers: req.headers,
    req,
    res,
  }),
});

exports.gqltest = functions.https.onRequest(server.createHandler({
  cors: {
    origin: true,
    credentials: true,
  },
}));

init().catch(console.log);