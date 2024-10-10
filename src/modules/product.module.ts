import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { ProductService } from "./product.service";
import { ProductRepository } from "./product.repository";
import { ProductController } from "./product.controller";
import { Category } from "../models/category.entity";
import { CategoryModule } from "../category/category.module";
import { CategoryService } from "../service/category.service";
import { CategoryRepository } from "../repository/category.repository";
@Module({
    imports:[TypeOrmModule.forFeature([Product, Category]), CategoryModule],
    providers:[ProductRepository,ProductService, CategoryService, CategoryRepository],
    controllers:[ProductController]
})
export class ProductModule{};