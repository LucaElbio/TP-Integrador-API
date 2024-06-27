import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from "typeorm"
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

    @OneToOne(() => Category)
    @JoinColumn({ name: "categoryId" })
    category!: Category;

    @OneToOne(() => Platform)
    @JoinColumn({ name: "platformId" })
    platform!: Platform;
}