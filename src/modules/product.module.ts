import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "../models/product.entity";
import { ProductService } from "../service/product.service";
import { ProductRepository } from "../repository/product.repository";
import { ProductController } from "../controllers/product.controller";
import { Category } from "../models/category.entity";
import { CategoryModule } from "./category.module";
import { CategoryService } from "../service/category.service";
import { CategoryRepository } from "../repository/category.repository";
import { Provider } from "../models/provider.entity";
import { ProviderModule } from "./provider.module";
import { ProviderService } from "../service/Provider.service";
import { ProviderRepository } from "../repository/Provider.repository";
@Module({
    imports:[TypeOrmModule.forFeature([Product, Category, Provider]), CategoryModule, ProviderModule],
    providers:[ProductRepository,ProductService, CategoryService, CategoryRepository, ProviderService, ProviderRepository],
    controllers:[ProductController]
})
export class ProductModule{};