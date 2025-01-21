import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum RepairStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}

@Entity() // Los decoradores son funciones que permiten decorar los nombres de las clases, métodos, propiedades, parámetros, etc. Ej: en el código se llama 'User' pero en la entidad base de datos se llamará 'usuarios'
export class Repair extends BaseEntity {


  @PrimaryGeneratedColumn("uuid") 
  id: string;

  @Column('date', {
    nullable: false
  })
  date: Date;


  @Column("varchar", {
    nullable: false,
  })
  motorsNumber: string;


  @Column("text", {
    nullable: false,
  })
  description: string;


  @Column("enum", {
    // Este estatus nos ayudará a saber si está activo o eliminado
    enum: RepairStatus,
    default: RepairStatus.PENDING
  })
  status: RepairStatus;

  @Column("varchar", {
    nullable: false
  })
  userId: string;
}


// DIAGRAMA DE RELACIONES
// Table Repairs {
//     id int [pk]  // clave primaria, auto-incrementable
//     date datetime
//     motorsNumber varchar(50)
//     description text
//     status varchar(50)
//     userId int [ref: > User.id]  // clave foránea que hace referencia a User.id
//   }photo varchar(255)
//   }
