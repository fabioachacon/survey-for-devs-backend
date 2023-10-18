import { SignUpController } from "./signup";

describe("SignUp Controller", () => {
  test("Should retorn 400 if no name is provided", () => {
    const sut = new SignUpController();

    const httpRequest = {
      body: {
        email: "test@mail.com",
        passord: "any",
        passwordConfirmation: "any",
      },
    };

    const response = sut.handle(httpRequest);
    expect(response.statusCode).toBe(400);
  });
});
