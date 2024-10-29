import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Movie } from "./Movie";

@Entity({ name: 'platforms' })
export class Platform {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    url!: string

    @OneToMany(() => Movie, movie => movie.platform)
    movies!: Movie[];
}