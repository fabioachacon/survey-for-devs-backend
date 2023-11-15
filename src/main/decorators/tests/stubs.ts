import { Controller } from "../../../presentation/protocols/controller";
import {
  HttpRequest,
  HttpResponse,
} from "../../../presentation/protocols/http";

export class ControllerStub implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse | undefined> {
    const httpResponse: HttpResponse = {
      body: {
        name: "Jon Doe",
      },
      statusCode: 200,
    };

    return httpResponse;
  }
}

export const makeControllerStub = () => {
  return new ControllerStub();
};
