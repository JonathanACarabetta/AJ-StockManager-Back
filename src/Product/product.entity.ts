import { Category } from "src/Category/category.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "Product"
})
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(()=>Category, (category)=>category.products)
    categories: Category[];

    @Column()
    cost: number;

    @Column()
    price: number;

    @Column()
    stock: number;

    @Column({
        unique: true
    })
    bar_code: number;

    @Column()
    brand: string;
}