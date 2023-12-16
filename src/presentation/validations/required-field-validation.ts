import { MissingParamError } from "../errors/MissingParamError";
import { Validation } from "../protocols/validation";

export class RequiredFieldValidation implements Validation {
  private readonly fielName: string;

  constructor(fieldName: string) {
    this.fielName = fieldName;
  }

  validate(value: any): Error | null | undefined {
    if (!value[this.fielName]) {
      return new MissingParamError(this.fielName);
    }
  }
}
