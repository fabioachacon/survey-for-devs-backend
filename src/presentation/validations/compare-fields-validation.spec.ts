import { InvalidParamError } from "../errors/InvalidParamError";
import { CompareFieldsValidation } from "./compared-fields-validation";

const getSut = () => {
  const sut = new CompareFieldsValidation("field", "fieldToCompare");

  return {
    sut,
  };
};

describe("CompareFieldsValidation", () => {
  test("Should throw InvalidParamError if field values are different", () => {
    const { sut } = getSut();

    const error = sut.validate({
      field: "any",
      fieldToCompare: "any_value",
    });

    expect(error).toEqual(new InvalidParamError("fieldToCompare"));
  });

  test("Shouldn't throw any error if validation succeeds", () => {
    const { sut } = getSut();

    const error = sut.validate({
      field: "any",
      fieldToCompare: "any",
    });

    expect(error).toBe(undefined);
  });
});
