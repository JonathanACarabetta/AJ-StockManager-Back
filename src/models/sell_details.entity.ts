import { Product } from "./product.entity";
import { Sell } from "./sell.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "sell_details" })
export class Sell_Details {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @OneToOne(() => Sell, (detail) => detail.detail, {
        onDelete: "CASCADE",
        cascade: ["soft-remove"],
    })
    sell: Sell;

    @ManyToMany(() => Product, (products) => products.sellDetail)
    products: Product[];

    @Column({ type: "float" })
    total: number;
}