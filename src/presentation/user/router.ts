import { Router } from "express";
import { UserService } from "../services/user.service";
import { UserController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.midleware";


export class UserRoutes {
  static get routes(): Router {
    
    const router = Router();

    const userService = new UserService(); 
    const userController = new UserController(userService);
    
    // Peticiones metodos controller
    router.post("/login", userController.loginUser); //login
    router.post("/", userController.createUser); //Registro


    router.use(AuthMiddleware.protect); //Rutas protegidas
    router.get("/", userController.findAllUser);
    router.get("/:id", userController.findOneUser);
    router.patch("/:id", userController.updateUser);
    router.delete("/:id", userController.deleteUser);

    return router;
  }
}
