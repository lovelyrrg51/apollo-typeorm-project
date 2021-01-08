import { BatchRecorder } from "zipkin";
import { HttpLogger } from "zipkin-transport-http";
const ZipkinJavascriptOpentracing = require("zipkin-javascript-opentracing");

const recorder = new BatchRecorder({
  logger: new HttpLogger({
    endpoint: "http://localhost:9411/api/v1/spans"
  })
});

// Setup the tracer to use http and implicit trace context
export const tracer = new ZipkinJavascriptOpentracing({
  serviceName: "TypeGraphQL TypeORM Sample",
  recorder,
  kind: "server"
});