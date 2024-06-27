import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { platformRepository } from "../repository";

export class PlatformController extends BaseController {
    static async addOrEdit(req: Request, res: Response){
        const platform = req.body as { id: number, name: string, url: string };
        if(platform.id == null){
            const newPlatform = platformRepository.create({
                name: platform.name,
                url: platform.url
            });
            await platformRepository.save(newPlatform);
            return res.status(201).send({ message: "Plataforma creada correctamente" });
        }else{
            const updatedPlatform = await platformRepository.findOneByOrFail({ id: platform.id })
            updatedPlatform.name = platform.name;
            updatedPlatform.url = platform.url;
            await platformRepository.save(updatedPlatform);
            return res.status(200).send({ message: "Plataforma modificada correctamente" });
        }
    }

    static async delete(req: Request, res: Response){
        const platformId: number = req.body.platformId;
        await platformRepository.delete({ id: platformId });
        return res.status(200).send({ message: "Plataforma eliminada correctamente" });
    }

    static async get(req: Request, res: Response){
        const platformId: number = parseInt(req.params.platformId);
        if(platformId != null){
            return res.status(200).send(await platformRepository.findOneBy({ id: platformId }));
        }else{
            return res.status(200).send(await platformRepository.find());
        }
    }
}