import { AppDataSource } from "../src/db";
import { Movie } from "../src/models/Movie";
import { Category } from "../src/models/Category";
import { Platform } from "../src/models/Platform";
import { FavoriteMovie } from "./models/FavoriteMovie";
import { User } from "./models/User";

export const movieRepository = AppDataSource.getRepository(Movie).extend({
    findWithRelations(id: number | undefined) {
        return this.find({ relations: ['category', 'platform'], where: id ? { id } : {} });
    }
});
export const categoryRepository = AppDataSource.getRepository(Category);
export const platformRepository = AppDataSource.getRepository(Platform);
export const favoriteMovieRepository = AppDataSource.getRepository(FavoriteMovie).extend({
    findWithRelations(id: number | undefined) {
        return this.find({ relations: ['movie.category', 'movie.platform'], where: id ? { id } : {} });
    }
});
export const userRepository = AppDataSource.getRepository(User);