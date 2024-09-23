import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "client"})
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable:true})
    phone_number: string;

    @Column({nullable:true})
    address: string;

    @Column({unique: true})
    email: string;

    @Column({unique: true, nullable:true, type:"bigint"})
    cuit: number;

    @Column({unique: true, nullable:true})
    fiscal_key: string;

    @Column()
    isDeleted: boolean;
}