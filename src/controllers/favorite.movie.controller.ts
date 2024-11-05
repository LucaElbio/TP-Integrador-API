import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { favoriteMovieRepository } from "../repository";

export class FavoriteMovieController extends BaseController {
    static async add(req: Request, res: Response){
        const { userId, movieId } = req.body as { userId: number, movieId: number };
        const newFavoriteMovie = favoriteMovieRepository.create({
            movieId: movieId,
            userId: userId
        });
        await favoriteMovieRepository.save(newFavoriteMovie);
        return res.status(201).send({ message: "Película agregada a favoritos correctamente" });
    }

    static async delete(req: Request, res: Response) {
        const favoriteMovieId = +req.params.favoriteMovieId;
        await favoriteMovieRepository.delete({ id: favoriteMovieId });
        return res.status(200).send({ message: "Película eliminada de favoritos correctamente" });
    }

    static async get(req: Request, res: Response){
        const favoriteMovieId: number | undefined = req.params.favoriteMovieId ? +req.params.favoriteMovieId : undefined;
        return res.status(200).send(await favoriteMovieRepository.find({ where: favoriteMovieId ? { id: favoriteMovieId } : {} }));
    }
}