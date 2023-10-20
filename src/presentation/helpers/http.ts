import { ServerError } from "../errors/ServerError";
import { HttpResponse } from "../protocols/http";

export const httpErrors = {
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
