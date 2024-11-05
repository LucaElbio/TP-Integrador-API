import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { FavoriteMovie } from "./FavoriteMovie"

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    firstName!: string

    @Column()
    lastName!: string

    @Column()
    email!: string

    @Column()
    password!: string

    @Column()
    birthDate!: Date

    @OneToMany(() => FavoriteMovie, fav => fav.movie)
    favoriteMovies!: FavoriteMovie[];
}