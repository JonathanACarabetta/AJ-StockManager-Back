import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sell } from "./sell.entity";
import { SellRepository } from "./sell.repository";
import { SellService } from "./sell.service";
import { SellController} from "./sell.controller";
import { ProductService } from "../Product/product.service";
import { ProductRepository } from "../Product/product.repository";
import { Product } from "../Product/product.entity";
import { CategoryService } from "../Category/category.service";
import { CategoryRepository } from "../Category/category.repository";
import { Category } from "../Category/category.entity";
import { Client } from "../Client/client.entity"
import { ClientService } from "../Client/client.service";
import { ClientRepository } from "../Client/client.repository";

@Module({
    imports:[TypeOrmModule.forFeature([Sell,Product,Category,Client])],
    providers:[SellRepository, SellService, ProductService, ProductRepository, CategoryService, CategoryRepository, ClientRepository, ClientService],
    controllers:[SellController]
})
export class SellModule{};