import { MissingParamError } from "../../errors/MissingParamErro";
import { HttpRequest, HttpResponse } from "../../protocols/http";
import { getMockedBadRequest } from "../../test/mock-bad-request";

export class SignUpControllerSpy {
  public async handle(request: HttpRequest): Promise<HttpResponse | undefined> {
    if (!request?.body.name) {
      return getMockedBadRequest(new MissingParamError("name"));
    } else if (!request?.body.email) {
      return getMockedBadRequest(new MissingParamError("email"));
    }
  }
}
