import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany } from "typeorm"
import { Category } from "./Category"
import { Platform } from "./Platform"
import { FavoriteMovie } from "./FavoriteMovie"

@Entity({ name: "movies"})
export class Movie {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    title!: string

    @Column()
    duration!: number

    @Column()
    minimumAge!: number

    @ManyToOne(() => Category, category => category.movies)
    @JoinColumn({ name: "categoryId" })
    category!: Category;

    @ManyToOne(() => Platform, platform => platform.movies)
    @JoinColumn({ name: "platformId" })
    platform!: Platform;

    @OneToMany(() => FavoriteMovie, fav => fav.movie)
    @JoinColumn({ name: "movieId" })
    favoriteMovies!: FavoriteMovie[];
}