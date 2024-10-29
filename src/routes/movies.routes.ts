import { Router } from "express";
import { MovieController } from "../controllers/movie.controller";

const router = Router();
router.get('/', MovieController.getAll);
router.post('/', MovieController.addOrEdit);
router.delete('/:movieId', MovieController.delete);
router.get('/:movieId', MovieController.get);

export default router;