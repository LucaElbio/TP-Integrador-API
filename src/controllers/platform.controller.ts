import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { platformRepository } from "../repository";

export class PlatformController extends BaseController {
    static async add(req: Request, res: Response){
        const platform = req.body as { id: number, name: string, url: string };
        const newPlatform = platformRepository.create({
            name: platform.name,
            url: platform.url
        });
        await platformRepository.save(newPlatform);
        return res.status(201).send({ message: "Plataforma creada correctamente" });
    }

    static async edit(req: Request, res: Response){
        const platform = req.body as { id: number, name: string, url: string };
        const updatedPlatform = await platformRepository.findOneByOrFail({ id: platform.id })
            updatedPlatform.name = platform.name;
            updatedPlatform.url = platform.url;
            await platformRepository.save(updatedPlatform);
            return res.status(200).send({ message: "Plataforma modificada correctamente" });
    }

    static async delete(req: Request, res: Response){
        const platformId: number = req.body.platformId;
        await platformRepository.delete({ id: platformId });
        return res.status(200).send({ message: "Plataforma eliminada correctamente" });
    }

    static async get(req: Request, res: Response){
        const platformId: number | undefined = req.params.platformId ? +req.params.platformId : undefined;
        return res.status(200).send(await platformRepository.find({ where: platformId ? { id: platformId } : {} }));
    }
}