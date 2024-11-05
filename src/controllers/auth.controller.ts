import { Request, Response } from "express-serve-static-core";
import { BaseController } from "./base.controller";
import { userRepository } from "../repository";

export class AuthController extends BaseController {
    static async login(req: Request, res: Response){
        const { email, password } = req.body as { email: string, password: string };
        const user = await userRepository.findOne({ where: { email, password }});
        if(user){
            return res.status(200).send({ id: user.id, userName: `${user.lastName} ${user.firstName}` })
        } else {
            return res.status(401).send({ message: "Usuario no registrado" })
        }
    }
}