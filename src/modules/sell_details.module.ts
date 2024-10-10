import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "../models/category.entity";
import { CategoryRepository } from "../repository/category.repository";
import { CategoryService } from "../service/category.service";
import { ClientRepository } from "../repository/client.repository";
import { ClientService } from "../service/client.service";
import { Product } from "../models/product.entity";
import { ProductRepository } from "../repository/product.repository";
import { ProductService } from "../service/product.service";
import { Sell } from "../models/sell.entity";
import { Sell_Details } from "../models/sell_details.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Sell_Details,Product,Category])],
    providers:[ProductService, ProductRepository, CategoryService, CategoryRepository],
})
export class Sell_DetailsModule{};