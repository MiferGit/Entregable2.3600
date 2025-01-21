import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { CreateUserDTO, CustomError, UpdateUserDTO } from "../../domain";
// import { PostService } from "./services/post.service";
// import { CreatePostDTO, CustomError, UpdatePostDTO } from "../../domain";

export class UserController {
  constructor(
    private readonly userService: UserService // inyectamos la dependencia de la clase PostService ´para la logica
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        message: error.message,
      });
    }
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  };

  //************CREAMOS LOS METODOS no son estaticos los instanciamos en erchivo de los postroutes ***************************************************************** */
  createUser = async (req: Request, res: Response) => {
    const [error, createUserDto] = CreateUserDTO.create(req.body);
    if (error) return res.status(422).json({ message: error });

    this.userService
    .createUser(createUserDto!)
    .then((data)=> res.status(200).json(data))
    .catch((error: any)=> this.handleError(error, res))
    // try {
    //   const data = await this.userService.createUser(createUserDto!);
    //   return res.status(201).json(data);
    // } catch (error) {
    //   return this.handleError(error, res);
    // }
  };

  //************************************************************ */
  findAllUser = (req: Request, res: Response) => {
    this.userService
      .findAllUser()
      .then((data) => {
        return res.status(200).json(data);
      })

      .catch((error: unknown) => this.handleError(error, res));
  };

  //**************************************************************************************** */
  findOneUser = (req: Request, res: Response) => {
    const { id } = req.params;

    this.userService
      .findOneUser(id)
      .then((data: any) => {
        res.status(200).json(data);
      })
      .catch((error: unknown) => this.handleError(error, res));
  };

  //****************************************************************************************** */
  updateUser = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, updateUserDto] = UpdateUserDTO.create(req.body);
    if (error) return res.status(422).json({ message: error });

    this.userService
      .updateUser(id, updateUserDto!)
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((error: unknown) => this.handleError(error, res));
  };

  //********************************************************************************************** */
  deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;

    this.userService
      .deleteUser(id)
      .then(() => {
        return res.status(204).json(null);
      })
      .catch((error: unknown) => this.handleError(error, res));
  };
}
