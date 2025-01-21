import validator from "validator"; // Asegúrate de tener esta dependencia instalada con `npm install validator`
import z from "zod";

const createRepairSchema = z.object({
  date: z.string().datetime(),
  motorsNumber: z.string().min(2),
  description: z.string().min(1),
  userId: z.string().uuid(),
});

export class CreateRepairDTO {
  constructor(
    public readonly date: Date,
    public readonly userId: string,
    public readonly motorsNumber: string,
    public readonly description: string
  ) {}

  // Método estático para crear el DTO, realizando validaciones
  static create(object: { [key: string]: any }): [string?, CreateRepairDTO?] {
    const { date, userId, motorsNumber, description } = object;

    const result = createRepairSchema.safeParse(object);

    if (!result.success) return [result.error?.message];

    // Si todas las validaciones pasaron, retornamos el DTO creado
    return [
      undefined, new CreateRepairDTO(date, userId, motorsNumber, description)];
  }
}
