// import { Request, Response } from "express";
// import { UserService } from "../services/user.service";
// import { CreateUserDTO, CustomError, UpdateUserDTO } from "../../domain";
// import { PostService } from "./services/post.service";
// import { CreatePostDTO, CustomError, UpdatePostDTO } from "../../domain";

import { Request, Response } from "express";
import { CreateRepairDTO, CustomError, UpdateRepairDTO } from "../../domain";
import { RepairService } from "../services/repair.service";

export class RepairController {

    constructor(
        private readonly repairService: RepairService // inyectamos la dependencia de la clase PostService ´para la logica
    ) {}

    private handleError =(error: unknown, res: Response)=> { 
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({
                message: error.message
            });
        }
           console.log(error);
           return res.status(500).json({message: 'something went repair ☠️❌'})
    }

 //************CREAMOS LOS METODOS no son estaticos los instanciamos en erchivo de los postroutes ***************************************************************** */   
        createRepair = (req: Request, res: Response) => {  // creamos metodo de CREARPOST

         const [error, createRepairDto] = CreateRepairDTO.create(req.body)  
            if(error) return res.status(422).json({message: error})


            this.repairService.createRepair(createRepairDto!) 
            .then((data: any) => {
                return res.status(201).json(data);
            })
            .catch((error: unknown)=> this.handleError(error, res)); 
            
        };

        //************************************************************ */
        findAllRepair = (req: Request, res: Response) => { 
           
            this.repairService
            .findAllRepair()  
            .then((data) => res.status(200).json(data))
            .catch((error: any)=> this.handleError(error, res))
        }

        //**************************************************************************************** */
        findOneRepair = (req: Request, res: Response) => {

            const {id} = req.params; 
           

            this.repairService.findOneRepair(id) 
            .then((data: any) => res.status(200).json(data))
            .catch((error: any) => this.handleError(error, res))
            
        }

     //****************************************************************************************** */   
     updateRepair = (req: Request,  res: Response) => {

        const {id} = req.params;
        const [error, updateRepairDto] = UpdateRepairDTO.create(req.body)
        if(error) return res.status(422).json({message: error})

        this.repairService.updateRepair(id, updateRepairDto!) 
        .then((data)=>{
            return res.status(200).json(data);
        })
        .catch((error: unknown)=> this.handleError(error, res));
     };

     //********************************************************************************************** */
     deleteRepair = (req: Request, res: Response) => {

        const {id} = req.params; 

        this.repairService.deleteRepair(id)
        .then(() => {
            return res.status(204).json(null);
        })
        .catch((error: unknown) => this.handleError(error, res))
     }
}