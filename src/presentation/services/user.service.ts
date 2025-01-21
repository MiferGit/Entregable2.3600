import { Status, Users } from "../../data/postgres/models/users.model";
import { CreateUserDTO, UpdateUserDTO } from "../../domain";

import { CustomError } from "../../domain/errors/custom.error";

export class UserService {
    constructor() {}

    async findAllUser() { 
        try {
           const user = await Users.find({
            where: {
                status: Status.AVAILABLE
            }
           }) 
           return user;
        } catch (error) {
            throw CustomError.internalServer('Error obteniendo datos de usuarios 💊');
        }
    }

    async findOneUser(id: string) {  
        const user = await Users.findOne({
            where: {
                status: Status.AVAILABLE, 
                id: id,  
            }
        });   

        if (!user) {
            throw CustomError.notFoud('Error usuario no encontrado 💊');
        } 
        return user;
    }

    async createUser(userData: CreateUserDTO) { 
        const user = new Users(); 
        user.name = userData.name;
        user.email = userData.email; 
        user.password = userData.password;
        user.role = userData.role

        try {
        const newUser = await user.save(); 
        return {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        }
        } catch (error) {
            throw CustomError.internalServer('Error en la creación de usuario 💊❌');
        }
    }

    async updateUser(id: string, userData: UpdateUserDTO) { 
        const user = await this.findOneUser(id);
        if (!user) {
            throw CustomError.notFoud('Error usuario no encontrado 💊');
        }

        user.name = userData.name.toLowerCase().trim(); 
        user.email = userData.email.trim();

        try {
             await user.save();
             return{
                message: 'Usuario actualizado'

             } 
        } catch (error) {
            throw CustomError.internalServer('Error al actualizar usuario 💊');
        }
    }

    async deleteUser(id: string) {
        const user = await this.findOneUser(id);
        if (!user) {
            throw CustomError.notFoud('Error usuario no encontrado');
        }

        user.status = Status.DISABLE;

        try {
            return await user.save();
        } catch (error) {
            throw CustomError.internalServer('Error al eliminar usuario');
        }
    }
}