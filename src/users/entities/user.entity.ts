import { UUID } from "crypto";
import { Role } from "./";

export class User {
  id: UUID;
  name: string;
  surname: string;
  email: string;
  password?: string;
  role: Role;
}
