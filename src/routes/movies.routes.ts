import { Router } from "express";
import { MovieController } from "../controllers/movie.controller";

const router = Router();
router.get('/:userId', MovieController.get);
router.get('/:userId/:movieId', MovieController.get);
router.post('/', MovieController.add);
router.put('/', MovieController.edit);
router.delete('/:movieId', MovieController.delete);

export default router;