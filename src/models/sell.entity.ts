import { Client } from "./client.entity";
import { Sell_Details } from "./sell_details.entity";
import { CreateDateColumn, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, OneToOne } from "typeorm";

@Entity({name: "sell"})
export class Sell {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pay_method: string;

    @Column()
    bill_type: string;

    @CreateDateColumn()
    date: Date;

    @ManyToOne(()=>Client, (client)=> client.sells)
    client: Client;

    @OneToOne(() => Sell_Details, (details) => details.sell)
    detail: Sell_Details;
}