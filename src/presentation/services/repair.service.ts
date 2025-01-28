import { In } from "typeorm";
import { Repair, RepairStatus } from "../../data";
import { CreateRepairDTO, CustomError, UpdateRepairDTO } from "../../domain";

export class RepairService {
  constructor() {}

  async findAllRepair() {
    try {
      return await Repair.find({
        where: {
          status: In([RepairStatus.PENDING, RepairStatus.COMPLETED])
        },

        relations: {
          user: true,
        },
        select: {
          user: {
            id: true,
            name: true,
            email:  true,
            role: true
          }
        }
      });
    } catch (error) {
      throw CustomError.internalServer(
        "Error obteniendo datos de reparacion ❌"
      );
    }
  }

  async findOneRepair(id: string) {
    const repair = await Repair.findOne({
      where: {
        status: RepairStatus.PENDING,
        id: id,
      },
    });

    if (!repair) {
      throw CustomError.notFoud("Error repair no encontrado ❌");
    }
    return repair;
  }

  async createRepair(repairData: CreateRepairDTO) {
    const repair = new Repair();
    repair.date = repairData.date;
    repair.userId = repairData.userId.trim();
    repair.motorsNumber = repairData.motorsNumber;
    repair.description = repairData.description;

    try {
      return await repair.save();
    } catch (error) {
      throw CustomError.internalServer("Error en la creación de repair ❌");
    }
  }

  async updateRepair(id: string, repairData: UpdateRepairDTO) {
    const repair = await this.findOneRepair(id);
    repair.status = RepairStatus.COMPLETED;

    try {
      return await repair.save();
    } catch (error) {
      throw CustomError.internalServer("Error al actualizar repair ❌");
    }
  }

  async deleteRepair(id: string) {
    const repair = await this.findOneRepair(id);
    repair.status = RepairStatus.CANCELLED;

    try {
      return await repair.save();
    } catch (error) {
      throw CustomError.internalServer("Error al eliminar repair ❌");
    }
  }
}
