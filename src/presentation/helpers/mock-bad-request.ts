import { HttpResponse } from "../protocols/http";

export const getBadRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error,
  };
};
