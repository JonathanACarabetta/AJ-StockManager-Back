import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { ProductService } from "./product.service";
import { ProductRepository } from "./product.repository";
import { ProductController } from "./product.controller";
import { Category } from "../Category/category.entity";
import { CategoryModule } from "../Category/category.module";
import { CategoryService } from "../Category/category.service";
import { CategoryRepository } from "../Category/category.repository";
@Module({
    imports:[TypeOrmModule.forFeature([Product, Category]), CategoryModule],
    providers:[ProductRepository,ProductService, CategoryService, CategoryRepository],
    controllers:[ProductController]
})
export class ProductModule{};