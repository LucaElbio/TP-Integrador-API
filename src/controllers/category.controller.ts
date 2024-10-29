import { Request, Response } from "express-serve-static-core";
import { BaseController } from "./base.controller";
import { categoryRepository } from "../repository";

export class CategoryController extends BaseController {
    static async addOrEdit(req: Request, res: Response){
        const category = req.body as { id: number, name: string };
        if(category.id == null){
            const newCategory = categoryRepository.create({
                name: category.name,
            });
            await categoryRepository.save(newCategory);
            return res.status(201).send({ message: "Categoría creada correctamente" });
        }else{
            const updatedCategory = await categoryRepository.findOneByOrFail({ id: category.id })
            updatedCategory.name = category.name;
            await categoryRepository.save(updatedCategory);
            return res.status(200).send({ message: "Categoría modificada correctamente" });
        }
    }

    static async delete(req: Request, res: Response){
        const categoryId: number = req.body.categoryId;
        await categoryRepository.delete({ id: categoryId });
        return res.status(200).send({ message: "Categoría eliminada correctamente" });
    }

    static async get(req: Request, res: Response){
        const categoryId: number = parseInt(req.params.categoryId);
        if(categoryId != null){
            return res.status(200).send(await categoryRepository.findOneBy({ id: categoryId }));
        }else{
            return res.status(200).send(await categoryRepository.find());
        }
    }

    static async getAll(req: Request, res: Response){
        return res.status(200).send(await categoryRepository.find());
    }
}