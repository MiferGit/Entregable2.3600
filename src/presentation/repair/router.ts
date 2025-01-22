import { Router } from "express";
import { RepairController} from "./controller";
import { RepairService } from "../services/repair.service";
import { AuthMiddleware } from "../middlewares/auth.midleware";



export class RepairRoutes {
    static get routes(): Router {   
        const router = Router();


        const repairService = new RepairService();  
        const repairController = new RepairController(repairService);
  
        router.post("/", repairController.createRepair); 

        router.use(AuthMiddleware.protect) //Protector de rutas
  
        router.get("/", repairController.findAllRepair);  

        router.get("/:id", repairController.findOneRepair);  

        router.patch("/:id", repairController.updateRepair);  

        router.delete("/:id", repairController.deleteRepair);

        return router;
    }
}