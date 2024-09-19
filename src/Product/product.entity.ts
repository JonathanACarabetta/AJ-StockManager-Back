import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "Product"
})
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    categories: String;

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