import { MissingParamError } from "../errors/MissingParamError";
import { ValidationStub } from "./tests/stub";
import { ValidationComposite } from "./validation-composite";

const getSut = () => {
  const sut = new ValidationComposite([new ValidationStub()]);

  return { sut };
};

describe("ValidationComposite", () => {
  test("Should return an Error if any validation fails", () => {
    const { sut } = getSut();

    const error = sut.validate({ field: "any_value" });

    expect(error).toEqual(new MissingParamError("field"));
  });
});
