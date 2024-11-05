import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm"
import { Movie } from "./Movie";
import { User } from "./User";

@Entity({ name: 'favorite_movies' })
export class FavoriteMovie {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    movieId!: number
    
    @Column()
    userId!: number

    @ManyToOne(() => Movie, movie => movie.favoriteMovies)
    movie!: Movie

    @ManyToOne(() => User, user => user.favoriteMovies)
    user!: User
}