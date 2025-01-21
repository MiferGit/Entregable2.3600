import { Router } from "express";
import { UserService } from "../services/user.service";
import { UserController } from "./controller";
// import { UserController, UserController } from "./controller";
// import { PostController } from "./controller";
// import { PostService } from "./services/post.service";


export class UserRoutes {
    static get routes(): Router {   //Cuando tenemos una clase y dentro un metodo estatic no es necesario hacer instancia osea ej: const appRoutes = new AppRoutes()
        const router = Router();


        const userService = new UserService();  //instanciamos la clase del archivo service PostService
        const userController = new UserController(userService); //instanciamos la clase del archivo controller PostController y hacemos la inyeccion como parametro postService
  //*************************************************************************************************** */
  //REALIZAMOS LAS PETICIONES DE LOS METODOS DE LOS CONTROLLERS
  
        router.get("/", userController.findAllUser); 

        router.post("/", userController.createUser); 

        router.get("/:id", userController.findOneUser);  

        router.patch("/:id", userController.updateUser);  

        router.delete("/:id", userController.deleteUser);

        return router;
    }
}