import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { categoryRepository, movieRepository, platformRepository } from "../repository";

export class MovieController extends BaseController {
    static async addOrEdit(req: Request, res: Response){
        const movie = req.body as { id: number, title: string, duration: number, minimumAge: number, categoryId: number, platformId: number };
        if(movie.id == null){
            const newMovie = movieRepository.create({
                title: movie.title,
                duration: movie.duration,
                minimumAge: movie.minimumAge,
                category: await categoryRepository.findOneByOrFail({ id: movie.categoryId }),
                platform: await platformRepository.findOneByOrFail({ id: movie.platformId }),
            });
            await movieRepository.save(newMovie);
            return res.status(201).send({ message: "Película creada correctamente" });
        }else{
            const updatedMovie = await movieRepository.findOneByOrFail({ id: movie.id })
            updatedMovie.title = movie.title;
            updatedMovie.duration = movie.duration;
            updatedMovie.minimumAge = movie.minimumAge;
            updatedMovie.category = await categoryRepository.findOneByOrFail({ id: movie.categoryId });
            updatedMovie.platform =  await platformRepository.findOneByOrFail({ id: movie.platformId });
            await movieRepository.save(updatedMovie);
            return res.status(200).send({ message: "Película modificada correctamente" });
        }
    }

    static async delete(req: Request, res: Response) {
        const movieId: number = +req.params.movieId;
        if (isNaN(movieId)) {
            return res.status(400).send({ message: "Invalid movie ID" });
        }

        await movieRepository.delete({ id: movieId });
        return res.status(200).send({ message: "Película eliminada correctamente" });
    }

    static async get(req: Request, res: Response){
        const movieId: number = parseInt(req.params.movieId);
        if(movieId != null){
            return res.status(200).send(await movieRepository.findOneBy({ id: movieId }));
        }else{
            return res.status(200).send(await movieRepository.find());
        }
    }

    static async getAll(req: Request, res: Response) {
        const movies = await movieRepository.findWithRelations();
        return res.status(200).send(movies);
    }
}