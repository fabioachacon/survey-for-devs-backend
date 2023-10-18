import { HttpResponse } from "../protocols/http";

export const getMockedBadRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error,
  };
};
