import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";

const router = Router();

router.post('/', CategoryController.addOrEdit);
router.delete('/', CategoryController.delete);
router.get('/:categoryId', CategoryController.get);

export default router;