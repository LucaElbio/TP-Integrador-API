import { Request, Response } from "express-serve-static-core";
import { BaseController } from "./base.controller";
import { categoryRepository } from "../repository";

export class CategoryController extends BaseController {
    static async add(req: Request, res: Response){
        const category = req.body as { id: number, name: string };
        const newCategory = categoryRepository.create({
            name: category.name,
        });
        await categoryRepository.save(newCategory);
        return res.status(201).send({ message: "Categoría creada correctamente" });
        
    }

    static async edit(req: Request, res: Response){
        const category = req.body as { id: number, name: string };
        const updatedCategory = await categoryRepository.findOneByOrFail({ id: category.id })
        updatedCategory.name = category.name;
        await categoryRepository.save(updatedCategory);
        return res.status(200).send({ message: "Categoría modificada correctamente" });
    }

    static async delete(req: Request, res: Response){
        const categoryId: number = req.body.categoryId;
        await categoryRepository.delete({ id: categoryId });
        return res.status(200).send({ message: "Categoría eliminada correctamente" });
    }

    static async get(req: Request, res: Response){
        const categoryId: number | undefined = req.params.categoryId ? +req.params.categoryId : undefined;
        return res.status(200).send(await categoryRepository.find({ where: categoryId ? { id: categoryId } : {} }));
    }
}