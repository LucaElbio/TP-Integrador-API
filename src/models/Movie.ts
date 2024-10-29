import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm"
import { Category } from "./Category"
import { Platform } from "./Platform"

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
}