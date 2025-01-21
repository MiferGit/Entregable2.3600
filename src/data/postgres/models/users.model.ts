import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Role {
    EMPLOYEE = 'EMPLOYEE',
    CLIENT = 'CLIENT'

}

export enum Status {
    AVAILABLE= 'AVAILABLE',
    DISABLE = 'DISABLE'
}

@Entity()
export class Users extends BaseEntity { 

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column('varchar', {
        length: 80, 
        nullable: false 
    })
    name: string;

    @Column('varchar', {
        length: 80, 
        nullable: false, 
        unique: true
    })
    email: string;

    @Column('varchar', {
        nullable: false 
    })
    password: string;

    @Column('enum', {
        enum:Role,
        default: Role.CLIENT
    })
    role: Role; 

    @Column('enum', {
        enum: Status,
        default: Status.AVAILABLE
    })
    status: Status;
}

//DIAGRAMA DE RELACIONES
// Table User {
//     id int [pk]  // clave primaria, auto-incrementable
//     name varchar(80)
//     email varchar(80) [unique]
//     password varchar(255)
//     role varchar(50)
//     status varchar(50)
//   }


