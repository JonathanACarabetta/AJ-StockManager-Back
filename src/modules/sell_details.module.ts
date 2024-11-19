import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category, Product, Provider, Sell_Details } from "../models";
import { CategoryRepository, ProductRepository, ProviderRepository, Sell_DetailsRepository } from "../repository";
import { CategoryService, ProductService, ProviderService, Sell_DetailsService } from "../service";

@Module({
    imports:[TypeOrmModule.forFeature([Sell_Details,Product,Category,Provider])],
    providers:[{provide:"ISell_DetailsService",useClass:Sell_DetailsService,},{provide:"IProductService",useClass:ProductService,}, ProductRepository, {provide:"ICategoryService",useClass:CategoryService,}, CategoryRepository, {provide:"IProviderService",useClass:ProviderService,}, ProviderRepository,Sell_DetailsRepository],
})
export class Sell_DetailsModule{};