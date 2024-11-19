import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryController } from "../controllers";
import { Category } from "../models";
import { CategoryRepository } from "../repository";
import { CategoryService } from "../service";


@Module({
    imports:[TypeOrmModule.forFeature([Category])],
    providers:[CategoryRepository,{provide:"ICategoryService",useClass:CategoryService,}],
    controllers:[CategoryController],
    exports: [{provide:"ICategoryService",useClass:CategoryService,}],
})
export class CategoryModule{};