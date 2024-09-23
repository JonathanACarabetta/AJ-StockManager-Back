import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "client"})
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    phone_number: string;

    @Column()
    address: string;

    @Column({unique: true})
    email: string;

    @Column({unique: true})
    cuit: number;

    @Column({unique: true})
    fiscal_key: string;

    @Column()
    isDeleted: boolean;
}