import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { categoryRepository, favoriteMovieRepository, movieRepository, platformRepository } from "../repository";

export class MovieController extends BaseController {
    static async add(req: Request, res: Response){
        const movie = req.body as { id: number, title: string, duration: number, minimumAge: number, categoryId: number, platformId: number };
        const newMovie = movieRepository.create({
            title: movie.title,
            duration: movie.duration,
            minimumAge: movie.minimumAge,
            category: await categoryRepository.findOneByOrFail({ id: movie.categoryId }),
            platform: await platformRepository.findOneByOrFail({ id: movie.platformId }),
        });
        await movieRepository.save(newMovie);
        return res.status(201).send({ message: "Película creada correctamente" });
    }

    static async edit(req: Request, res: Response){
        const movie = req.body as { id: number, title: string, duration: number, minimumAge: number, categoryId: number, platformId: number };
        const updatedMovie = await movieRepository.findOneByOrFail({ id: movie.id })
        updatedMovie.title = movie.title;
        updatedMovie.duration = movie.duration;
        updatedMovie.minimumAge = movie.minimumAge;
        updatedMovie.category = await categoryRepository.findOneByOrFail({ id: movie.categoryId });
        updatedMovie.platform =  await platformRepository.findOneByOrFail({ id: movie.platformId });
        await movieRepository.save(updatedMovie);
        return res.status(200).send({ message: "Película modificada correctamente" });
    }

    static async delete(req: Request, res: Response) {
        const movieId: number = +req.params.movieId;
        await movieRepository.delete({ id: movieId });
        return res.status(200).send({ message: "Película eliminada correctamente" });
    }

    static async get(req: Request, res: Response){
        const userId: number = +req.params.userId
        const movieId: number | undefined = req.params.movieId ? +req.params.movieId : undefined;
        let movies = await movieRepository.findWithRelations(movieId)
        const favoriteMovies = await favoriteMovieRepository.findBy({ userId })
        movies = movies.map((m) => {
            return {
                ...m,
                favorite: favoriteMovies.find((fv) => fv.movieId == m.id) ? true : false
            }
        })
        return res.status(200).send(movies);
    }
}