import { Role } from "../../../data";

export class CreateUserDTO {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: Role
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateUserDTO?] {
    const { name, email, password, role } = object;

    // Validaciónes
    if (!name) return ["El nombre no existe 🍅", undefined];
    if (typeof name !== "string")
      return ["El nombre debe ser un string", undefined];
    if (name.length <= 5)
      return ["El nombre debe tener más de 5 caracteres", undefined];

    if (!email) return ["El correo no existe", undefined];

    if (!password) return ["El password no existe 🍅", undefined];
    if (password.length <= 5)
      return ["El password debe tener más de 5 caracteres", undefined];

    if (!role) return ["El rol no existe 🍅", undefined];
    if (role.length <= 5)
      return ["El nombre debe tener más de 5 caracteres", undefined];

    return [undefined, new CreateUserDTO(name, email, password, role)];
  }
}
