import { Validation } from "../../presentation/protocols/validation";
import { CompareFieldsValidation } from "../../presentation/validations/compared-fields-validation";
import { RequiredFieldValidation } from "../../presentation/validations/required-field-validation";
import { ValidationComposite } from "../../presentation/validations/validation-composite";
import { makeSignUpValidations } from "./signup-validation";

jest.mock("../../presentation/validation/validation-composite");

describe("SignUpValidations Factory", () => {
  test("Should call ValidationComposite with all validations", () => {
    makeSignUpValidations();

    const requiredFields = [
      "name",
      "email",
      "password",
      "passwordConfirmation",
    ];

    const requiedFields = requiredFields.map(
      (field) => new RequiredFieldValidation(field)
    );

    const compareFields = new CompareFieldsValidation(
      "password",
      "passwordConfirmation"
    );

    const validations: Validation[] = [];
    validations.push(...requiedFields, compareFields);
    expect(ValidationComposite).toHaveBeenLastCalledWith(validations);
  });
});
