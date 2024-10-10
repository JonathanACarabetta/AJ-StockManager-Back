import { Client } from "src/models/client.entity";
import { Product } from "src/models/product.entity";
import { Sell_Details } from "src/models/sell_details.entity";
import { CreateDateColumn, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "sell"})
export class Sell {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pay_method: string;

    @Column({ default: 0, type: "float" })
    total: number;

    @Column()
    bill_type: string;

    @CreateDateColumn()
    date: Date;

    @ManyToOne(()=>Client, (client)=> client.sells)
    client: Client;

    @OneToMany(() => Sell_Details, (details) => details.sell)
    details: Sell_Details[];
}