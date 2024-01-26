import { Credentials } from "../models/credentials";

export type AuthParams = {
  email: string;
  password: string;
};
export interface Authentication {
  auth(credentials: Credentials): Promise<string | null>;
}
