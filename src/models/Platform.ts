import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'platforms' })
export class Platform {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    url!: string

}