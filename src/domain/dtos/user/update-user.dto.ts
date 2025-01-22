export class UpdateUserDTO {
  constructor(public readonly name: string, public readonly email: string) {}

  static create(object: { [key: string]: any }): [string?, UpdateUserDTO?] {
    const { name, email } = object;

    if (!name) return ["El nombre no existe"];
    if (name.length <= 3) return ["El nombre debe tener mas de 3 caracteres"];
    if (typeof name !== "string") return ["El nombre debe ser un string"];

    if (!email) return ["El correo no existe"];
    if (typeof email !== "string") return ["el contenido debe ser un string"];

    return [undefined, new UpdateUserDTO(name, email)];
  }
}
