import { makeEmailValidationStub } from "../../presentation/controllers/test/stubs";
import { Validation } from "../../presentation/protocols/validation";
import { CompareFieldsValidation } from "../../presentation/validations/compared-fields-validation";
import { EmailValidation } from "../../presentation/validations/email-validation";
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

    const emailValidor = makeEmailValidationStub();
    const emailValidation = new EmailValidation("email", emailValidor);

    const validations: Validation[] = [];
    validations.push(...requiedFields, compareFields, emailValidation);
    expect(ValidationComposite).toHaveBeenLastCalledWith(validations);
  });
});
