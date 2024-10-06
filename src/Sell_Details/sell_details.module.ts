import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/Category/category.entity";
import { CategoryRepository } from "src/Category/category.repository";
import { CategoryService } from "src/Category/category.service";
import { ClientRepository } from "src/Client/client.repository";
import { ClientService } from "src/Client/client.service";
import { Product } from "src/Product/product.entity";
import { ProductRepository } from "src/Product/product.repository";
import { ProductService } from "src/Product/product.service";
import { Sell_Details } from "./sell_details.entity";
import { Sell } from "src/Sell/sell.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Sell_Details,Product,Category])],
    providers:[ProductService, ProductRepository, CategoryService, CategoryRepository],
})
export class Sell_DetailsModule{};