import { AppDataSource } from "../src/db";
import { Movie } from "../src/models/Movie";
import { Category } from "../src/models/Category";
import { Platform } from "../src/models/Platform";

export const movieRepository = AppDataSource.getRepository(Movie).extend({
    findWithRelations(id: number | undefined) {
        return this.find({ relations: ['category', 'platform'], where: id ? { id } : {} });
    }
});
export const categoryRepository = AppDataSource.getRepository(Category);
export const platformRepository = AppDataSource.getRepository(Platform);