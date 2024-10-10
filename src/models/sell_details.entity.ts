import { Product } from "src/models/product.entity";
import { Sell } from "src/models/sell.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "sell_details" })
export class Sell_Details {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @ManyToOne(() => Sell, (detail) => detail.details, {
        onDelete: "CASCADE",
        cascade: ["soft-remove"],
    })
    sell: Sell;

    @ManyToOne(() => Product, (product) => product.sellDetail)
    product: Product;

    @Column({ default: 1 })
    quantity: number;

    @Column({ type: "float" })
    total: number;
}