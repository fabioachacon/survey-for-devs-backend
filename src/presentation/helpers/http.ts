import { ServerError } from "../errors/ServerError";
import { Unauthorized } from "../errors/Unauthorized";
import { HttpResponse } from "../protocols/http";

interface Responses {
  ok(body: any): HttpResponse;
  badRequest(error: Error): HttpResponse;
  serverError(stack: string): HttpResponse;
  unauthorized(): HttpResponse;
}

export const httpResponses: Responses = {
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
  serverError(stack: string): HttpResponse {
    return {
      statusCode: 500,
      body: new ServerError(stack),
    };
  },
  unauthorized(): HttpResponse {
    return {
      statusCode: 401,
      body: new Unauthorized(),
    };
  },
};
