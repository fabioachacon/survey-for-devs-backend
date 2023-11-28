import { Validation } from "../protocols/validation";

export class EmailValidator implements Validation {
  validate(value: any): Error | null | undefined {
    throw new Error("Method not implemented.");
  }
}
