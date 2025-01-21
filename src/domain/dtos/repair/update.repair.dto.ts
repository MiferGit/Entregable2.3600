import validator from 'validator';  // Asegúrate de tener esta dependencia instalada con `npm install validator`

export class UpdateRepairDTO {
    constructor(
        public readonly date: Date,
        public readonly userId: string,
    ) {}

    // Método estático para crear el DTO, realizando validaciones
    static create(object: { [key: string]: any }): [string?, UpdateRepairDTO?] {
        const { date, userId } = object;

        // Validación de la fecha
        if (!date) return ['La fecha no existe', undefined];
        if (!(date instanceof Date)) return ['La fecha debe ser un objeto Date', undefined];

        // Validación del userId
        if (!userId) return ['El userId no existe', undefined];
        if (typeof userId !== 'string') return ['El userId debe ser un string', undefined];
        if (!validator.isUUID(userId)) return ['El userId no tiene un formato válido', undefined];

        // Si todas las validaciones pasaron, retornamos el DTO creado
        return [undefined, new UpdateRepairDTO(date, userId)];
    }
}