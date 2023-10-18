export class InvalidParamError extends Error {
  constructor(name: string) {
    super(`Invalid param: ${name}`);

    this.name = "InvalidParamError";
  }
}
