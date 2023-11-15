import { Controller } from "../../presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "../../presentation/protocols/http";

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller;

  constructor(controller: Controller) {
    this.controller = controller;
  }

  async handle(request: HttpRequest): Promise<HttpResponse | undefined> {
    const response = await this.controller.handle(request);

    if (response?.statusCode == 500) {
      // console.log();
    }

    return response;
  }
}
