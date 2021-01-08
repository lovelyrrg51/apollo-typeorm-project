import { createConnection } from "typeorm";

import { TypeOrmInstrumentation } from "zipkin-instrumentation-typeorm";
// import * as functions from 'firebase-functions';

// console.log(`connect to:"/cloudsql/${functions.config().db.conn}"`);
import { tracer } from "./tracer"

export const connection = createConnection("local").then(con => TypeOrmInstrumentation.proxyConnection(con, { tracer: tracer._zipkinTracer, serviceName: "TypeGraphQL TypeORM Sample" }))