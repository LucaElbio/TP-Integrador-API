import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Movie } from "./Movie";

@Entity({ name: 'categories' })
export class Category {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @OneToMany(() => Movie, movie => movie.category, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    movies!: Movie[];
}