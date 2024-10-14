import { Product } from "../models/product.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "Category"
})
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    name: string;

    @ManyToMany(() => Product, (product) => product.categories)
    products: Product[];

    @Column()
    isDeleted: boolean;
}