import validator from "validator"; // Asegúrate de tener esta dependencia instalada con `npm install validator`
import z from "zod";

const createRepairSchema = z.object({
  date: z.string({message: "data es requerida"}).date(),
  motorsNumber: z.string().min(2, {message: "motorNumber es requerido"}),
  description: z.string().min(5, {message: "Descripcion es requerida"}),
  userId: z.string().uuid({message: "userId es requerido"}),
});

export class CreateRepairDTO {
  constructor(
    public readonly date: Date,
    public readonly userId: string,
    public readonly motorsNumber: string,
    public readonly description: string
  ) {}

  // Método estático para crear el DTO, realizando validaciones
  static create(object: { [key: string]: any }): [Record<string, string>?, CreateRepairDTO?] {
    const { date, userId, motorsNumber, description } = object;

    const result = createRepairSchema.safeParse(object);

    if (!result.success) {
      const errorMessages = result.error.errors.reduce((acc: any, err: any) => {
        const field = err.path.join(".");
        // console.log(field);
        acc[field] = err.message
        console.log(err.path);
        return acc;
      }, {} as Record<string, string>);
      return [errorMessages];
      
    }

    // Si todas las validaciones pasaron, retornamos el DTO creado
    return [undefined, new CreateRepairDTO(date, userId, motorsNumber, description)];
  }
}
