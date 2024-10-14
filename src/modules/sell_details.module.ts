import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "../models/category.entity";
import { CategoryRepository } from "../repository/category.repository";
import { CategoryService } from "../service/category.service";
import { Product } from "../models/product.entity";
import { ProductRepository } from "../repository/product.repository";
import { ProductService } from "../service/product.service";
import { Sell_Details } from "../models/sell_details.entity";
import { Provider } from "../models/provider.entity";
import { ProviderService } from "../service/Provider.service";
import { ProviderRepository } from "../repository/Provider.repository";

@Module({
    imports:[TypeOrmModule.forFeature([Sell_Details,Product,Category,Provider])],
    providers:[ProductService, ProductRepository, CategoryService, CategoryRepository, ProviderService, ProviderRepository],
})
export class Sell_DetailsModule{};