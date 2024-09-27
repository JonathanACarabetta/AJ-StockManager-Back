import { Client } from "src/Client/client.entity";
import { Product } from "src/Product/product.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "sell"})
export class Sell {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pay_method: string;

    @Column()
    total: number;

    @Column()
    bill_type: string;

    @ManyToMany(()=>Product,(product)=>product.sells)
    @JoinTable({
        name: "sell_product",
        joinColumns: [{
            name: "sell_id",
            referencedColumnName: "id"
        }],
        inverseJoinColumns: [{
            name: "product_id",
            referencedColumnName: "id"
        }]
    })
    products: Product[];

    @ManyToOne(()=>Client, (client)=> client.sells)
    @JoinTable({
        name: "sell_client",
        joinColumns: [{
            name: "sell_id",
            referencedColumnName: "id"
        }],
        inverseJoinColumns: [{
            name: "client_id",
            referencedColumnName: "id"
        }]
    })
    client: Client;
}