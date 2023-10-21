import { ServerError } from "../errors/ServerError";
import { HttpResponse } from "../protocols/http";

export const httpResponses = {
  ok(body: any): HttpResponse {
    return {
      statusCode: 200,
      body: body,
    };
  },
  badRequest(error: Error): HttpResponse {
    return {
      statusCode: 400,
      body: error,
    };
  },
  serverError(): HttpResponse {
    return {
      statusCode: 500,
      body: new ServerError(),
    };
  },
};
