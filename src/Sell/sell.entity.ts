import { Client } from "src/Client/client.entity";
import { Product } from "src/Product/product.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "sell"})
export class Sell {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pay_method: string;

    @Column()
    total: number;

    @Column()
    client_id: number;

    @Column()
    bill_type: string;

    @ManyToMany(()=>Product,(product)=>product.sells)
    products: Product[];

    @ManyToOne(()=>Client, (client)=> client.sells)
    client: Client;
}