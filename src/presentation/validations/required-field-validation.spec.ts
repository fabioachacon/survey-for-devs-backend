import { MissingParamError } from "../errors/MissingParamError";
import { RequiredFieldValidation } from "./required-field-validation";

const getSut = () => {
  const sut = new RequiredFieldValidation("field");

  return {
    sut,
  };
};

describe("RequiredFieldValidation", () => {
  test("Should return MissingParamError if validation fails", () => {
    const { sut } = getSut();

    const error = sut.validate({ name: "any" });

    expect(error).toEqual(new MissingParamError("field"));
  });

  test("Shouldn't return MissingParamError if validation succeds", () => {
    const { sut } = getSut();

    const error = sut.validate({ field: "any" });

    expect(error).toBe(undefined);
  });
});
