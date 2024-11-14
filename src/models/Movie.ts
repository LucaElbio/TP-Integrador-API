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

    @ManyToOne(() => Category, category => category.movies, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    @JoinColumn({ name: "categoryId" })
    category!: Category;

    @ManyToOne(() => Platform, platform => platform.movies, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    @JoinColumn({ name: "platformId" })
    platform!: Platform;

    @OneToMany(() => FavoriteMovie, fav => fav.movie, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    @JoinColumn({ name: "movieId" })
    favoriteMovies!: FavoriteMovie[];
}