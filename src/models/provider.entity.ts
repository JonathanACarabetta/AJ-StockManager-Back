import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity({name:"provider"})
export class Provider {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;
    
    @Column()
    address: string;

    @ManyToMany(() => Product, (product) => product.categories)
    products: Product[];

}