import { Router } from "express";
import { RepairController} from "./controller";
import { RepairService } from "../services/repair.service";



export class RepairRoutes {
    static get routes(): Router {   //Cuando tenemos una clase y dentro un metodo estatic no es necesario hacer instancia osea ej: const appRoutes = new AppRoutes()
        const router = Router();


        const repairService = new RepairService();  //instanciamos la clase del archivo service PostService
        const repairController = new RepairController(repairService); //instanciamos la clase del archivo controller PostController y hacemos la inyeccion como parametro postService
  //*************************************************************************************************** */
  //REALIZAMOS LAS PETICIONES DE LOS METODOS DE LOS CONTROLLERS
  
        router.get("/", repairController.findAllRepair); // el get es para obtener buscar y llamamo al metodo finAllPost

        router.post("/", repairController.createRepair); // el post es para crear y llamamos al metodo createPost

        router.get("/:id", repairController.findOneRepair);  //para resibir una cosas en especifico

        router.patch("/:id", repairController.updateRepair);  //para actualizar patch necesita :id

        router.delete("/:id", repairController.deleteRepair);

        return router;
    }
}