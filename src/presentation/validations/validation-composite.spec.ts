import { MissingParamError } from "../errors/MissingParamError";
import { ValidationStub } from "./tests/stub";
import { ValidationComposite } from "./validation-composite";

const getSut = () => {
  const validatonStub = [new ValidationStub(), new ValidationStub()];

  const sut = new ValidationComposite(validatonStub);

  return { sut, validatonStub };
};

describe("ValidationComposite", () => {
  test("Should return an Error if any validatio n fails", () => {
    const { sut, validatonStub } = getSut();

    jest
      .spyOn(validatonStub[0], "validate")
      .mockReturnValueOnce(new MissingParamError("field"));

    const error = sut.validate({ field: "any_value" });

    expect(error).toEqual(new MissingParamError("field"));
  });
});
