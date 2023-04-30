import { Role } from "roles/roles.model";

export class CreateUserDto {
  readonly username: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phone_number: string;
  readonly email: string;
  readonly role: Role
}
