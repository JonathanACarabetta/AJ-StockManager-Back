import { Category } from "./category.entity";
import { Sell_Details } from "./sell_details.entity";
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

    @Column({
        type: "float"
    })
    cost: number;

    @Column({
        type: "float"
    })
    price: number;

    @Column({
        type: "int"
    })
    stock: number;

    @Column({
        unique: true
    })
    bar_code: string;

    @Column()
    brand: string;

    @OneToMany(()=>Sell_Details,(details)=>details.product)
    sellDetail: Sell_Details[];
}