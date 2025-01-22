import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwt.adapter";
import { Role, Status, Users } from "../../data";

export class AuthMiddleware {
  static async protect(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header("Authorization");

    if (!authorization) {
      return res.status(401).json({
        message: "Proporcione un token, por favor inicie sesión nuevamente.",
      });
    }
    if (!authorization.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ message: "Token invalido, porfavor inicie sesion nuevamente" });
    }

    const token = authorization.split(" ")[1] || "";

    try {
      const payload = (await JwtAdapter.verifyToken(token)) as { id: string }; //id del Usuario
      if (!payload)
        return res.status(401).json({
          message: "Token invalido, porfavor inicie sesion nuevamente ☠️",
        });

      const user = await Users.findOne({
        where: { id: payload.id, status: Status.AVAILABLE },
      });
      if (!user)
        return res.status(401).json({
          message: "User no encontrado, porfavor inicie sesion nuevamente ☠️",
        });

      req.body.sessionUser = user;

      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error en el server interno ☠️" });
    }
  }

  static restricTo = (...roles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!roles.includes(req.body.sessionUser.role)) {
        return res.status(403).json({ message: "No estas autorizado ☠️" });
      }

      next();
    };
  };
}
