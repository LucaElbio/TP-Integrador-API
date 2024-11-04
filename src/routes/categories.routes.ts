import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";

const router = Router();
router.get('/', CategoryController.get);
router.get('/:categoryId', CategoryController.get);
router.post('/', CategoryController.add);
router.put('/', CategoryController.edit);
router.delete('/', CategoryController.delete);

export default router;