import validator from 'validator';  // Asegúrate de tener esta dependencia instalada con `npm install validator`

export class CreateRepairDTO {
    constructor(
        public readonly date: Date,
        public readonly userId: string,
    ) {}

    // Método estático para crear el DTO, realizando validaciones
    static create(object: { [key: string]: any }): [string?, CreateRepairDTO?] {
        const { date, userId } = object;

        // Validación de la fecha
        if (!date) return ['La fecha no existe'];
       

        // Validación del userId
        if (!userId) return ['El userId no existe'];


        // Si todas las validaciones pasaron, retornamos el DTO creado
        return [undefined, new CreateRepairDTO(date, userId)];
    }
}