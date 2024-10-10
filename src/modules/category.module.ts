import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "../models/category.entity";
import { CategoryRepository } from "../repository/category.repository";
import { CategoryService } from "../service/category.service";
import { CategoryController } from "../controllers/category.controller";

@Module({
    imports:[TypeOrmModule.forFeature([Category])],
    providers:[CategoryRepository,CategoryService],
    controllers:[CategoryController],
    exports: [CategoryService],
})
export class CategoryModule{};