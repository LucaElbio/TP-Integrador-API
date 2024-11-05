import "reflect-metadata"
import { DataSource } from "typeorm"
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, DB_PORT } from "./env";
import { Category } from "./models/Category";
import { Movie } from "./models/Movie";
import { Platform } from "./models/Platform";
import { FavoriteMovie } from "./models/FavoriteMovie";
import { User } from "./models/User";

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: false, // false on Prod
    logging: true,
    entities: [Movie, Category, Platform, FavoriteMovie, User]
});