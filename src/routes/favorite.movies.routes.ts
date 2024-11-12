import { Router } from "express";
import { FavoriteMovieController } from "../controllers/favorite.movie.controller";

const router = Router();
router.get('/', FavoriteMovieController.get);
router.get('/:userId', FavoriteMovieController.get);
router.post('/', FavoriteMovieController.add);
router.delete('/', FavoriteMovieController.delete);

export default router;