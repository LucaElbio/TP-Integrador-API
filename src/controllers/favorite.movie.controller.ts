import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { favoriteMovieRepository } from "../repository";

export class FavoriteMovieController extends BaseController {
    static async add(req: Request, res: Response) {
        const { userId, movieId } = req.body as { userId: number, movieId: number };
        const newFavoriteMovie = favoriteMovieRepository.create({
            movieId: movieId,
            userId: userId
        });
        await favoriteMovieRepository.save(newFavoriteMovie);
        return res.status(201).send({ message: "Película agregada a favoritos correctamente" });
    }

    static async delete(req: Request, res: Response) {
        const { userId, movieId } = req.body as { userId: number, movieId: number };
        await favoriteMovieRepository.delete({ movieId: movieId, userId: userId });
        return res.status(200).send({ message: "Película eliminada de favoritos correctamente" });
    }

    static async get(req: Request, res: Response) {
        const userId: number | undefined = req.query.userId ? +req.query.userId : undefined;
        
        if (!userId) {
            return res.status(400).send({ message: "User ID is required" });
        }

        try {
            const favorites = await favoriteMovieRepository.find({
                relations: ['movie', 'movie.category', 'movie.platform'],
                where: { userId },
            });
            return res.status(200).send(favorites);
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: "Error retrieving favorites" });
        }
    }
}