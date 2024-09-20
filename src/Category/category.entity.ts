import { Product } from "src/Product/product.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "category"
})
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(()=> Product,(product)=> product.categories)
    @JoinTable({
        name: "product_category",
        joinColumns: [{
            name: "category_id",
            referencedColumnName: "id"
        }],
        inverseJoinColumns: [{
            name: "product_id",
            referencedColumnName: "id"
        }]
    })
    products: Product[];

    @Column()
    isDeleted: boolean;
}