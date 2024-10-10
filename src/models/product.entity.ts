import { Category } from "../models/category.entity";
import { Sell_Details } from "../models/sell_details.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Provider } from "./provider.entity";

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

    @ManyToMany(() => Provider, (provider) => provider.products)
    @JoinTable()
    providers: Provider[];

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