import { ServerError } from "../../presentation/errors/ServerError";
import { httpResponses } from "../../presentation/helpers/http";
import { LogControllerDecorator } from "./log-decorator";
import { makeControllerStub } from "./tests/stubs";

const getSut = () => {
  const controllerStub = makeControllerStub();
  const sut = new LogControllerDecorator(controllerStub);

  return {
    sut,
    controllerStub,
  };
};

describe("LogController Decorator", () => {
  test("Should call controller handle", async () => {
    const { sut, controllerStub } = getSut();

    const handleSpy = jest.spyOn(controllerStub, "handle");

    const httpRequest = {
      body: {
        email: "any_password",
        name: "any_name",
        password: "an_pass",
        passwordConfirmation: "any_pass",
      },
    };

    await sut.handle(httpRequest);
    expect(handleSpy).toHaveBeenCalledWith(httpRequest);
  });

  test("Should return the same result as the Controller", async () => {
    const { sut } = getSut();

    const httpRequest = {
      body: {
        email: "any_password",
        name: "any_name",
        password: "any_pass",
        passwordConfirmation: "any_pass",
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual({
      body: {
        name: "Jon Doe",
      },
      statusCode: 200,
    });
  });

  test("Should call LogErrorRepository with correct error if controller returns a server error", async () => {
    const { sut, controllerStub } = getSut();

    jest
      .spyOn(controllerStub, "handle")
      .mockReturnValueOnce(
        new Promise((resolve) =>
          resolve(httpResponses.serverError(new Error().stack || ""))
        )
      );

    const httpRequest = {
      body: {
        email: "",
        name: "",
        password: "",
        passwordConfirmation: "",
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual({
      statusCode: 500,
      body: new ServerError(""),
    });
  });
});
