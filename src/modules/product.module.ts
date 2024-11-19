import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category, Product, Provider } from "../models";
import { CategoryRepository, ProductRepository, ProviderRepository } from "../repository";
import { CategoryService, ProductService, ProviderService } from "../service";
import { ProductController } from "../controllers";


@Module({
    imports:[TypeOrmModule.forFeature([Product, Category, Provider])],
    providers:[ProductRepository,{provide:"ICategoryService",useClass:CategoryService,}, CategoryRepository, {provide:"IProductService",useClass:ProductService,}, {provide:"IProviderService",useClass:ProviderService,},ProviderRepository,CategoryRepository],
    controllers:[ProductController]
})
export class ProductModule{};