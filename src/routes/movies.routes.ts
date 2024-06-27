import { Router } from "express";
import { MovieController } from "../controllers/movie.controller";

const router = Router();

router.post('/', MovieController.addOrEdit);
router.delete('/', MovieController.delete);
router.get('/:movieId', MovieController.get);

export default router;