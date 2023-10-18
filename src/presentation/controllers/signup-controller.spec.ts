import { MissingParamError } from "../errors/MissingParamError";
import { SignUpController } from "./signup-controller";

describe("SignUp Controller", () => {
  test("Should retorn 400 if no name is provided", async () => {
    const sut = new SignUpController();

    const httpRequest = {
      body: {
        email: "test@mail.com",
        passord: "any",
        passwordConfirmation: "any",
      },
    };

    const response = await sut.handle(httpRequest);
    expect(response?.statusCode).toBe(400);
    expect(response?.body).toEqual(new MissingParamError("name"));
  });

  test("Should retorn 400 if no email is provided", async () => {
    const sut = new SignUpController();

    const httpRequest = {
      body: {
        name: "any_name",
        password: "any",
        passwordConfirmation: "any",
      },
    };

    const response = await sut.handle(httpRequest);
    expect(response?.statusCode).toBe(400);
    expect(response?.body).toEqual(new MissingParamError("email"));
  });

  test("Should retorn 400 if no password is provided", async () => {
    const sut = new SignUpController();

    const httpRequest = {
      body: {
        name: "any_name",
        email: "test@mail.com",
        passwordConfirmation: "any",
      },
    };

    const response = await sut.handle(httpRequest);
    expect(response?.statusCode).toBe(400);
    expect(response?.body).toEqual(new MissingParamError("password"));
  });
});
