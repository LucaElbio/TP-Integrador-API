import { AppDataSource } from "../src/db";
import { Movie } from "../src/models/Movie";
import { Category } from "../src/models/Category";
import { Platform } from "../src/models/Platform";

export const movieRepository = AppDataSource.getRepository(Movie);
export const categoryRepository = AppDataSource.getRepository(Category);
export const platformRepository = AppDataSource.getRepository(Platform);