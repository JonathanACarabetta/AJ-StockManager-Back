import { Category } from "src/Category/category.entity";
import { Sell } from "src/Sell/sell.entity";
import { Sell_Details } from "src/Sell_Details/sell_details.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "Product"
})
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Category, (category) => category.products)
    @JoinTable()
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

    @Column()
    provider_name: string;

    @OneToMany(()=>Sell_Details,(details)=>details.product)
    sellDetail: Sell_Details[];
}