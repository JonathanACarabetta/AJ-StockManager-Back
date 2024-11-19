import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category, Client, Product, Provider, Sell, Sell_Details } from "../models";
import { SellController } from "../controllers";
import { CategoryService, ClientService, ProductService, ProviderService, Sell_DetailsService, SellService } from "../service";
import { CategoryRepository, ClientRepository, ProductRepository, ProviderRepository, Sell_DetailsRepository, SellRepository } from "../repository";


@Module({
    imports:[TypeOrmModule.forFeature([Sell,Product,Category,Client,Sell_Details, Provider])],
    providers:[{provide:"ISellService",useClass:SellService,},{provide:"IProductService",useClass:ProductService,},{provide:"ICategoryService",useClass:CategoryService,},{provide:"IClientService",useClass:ClientService,},{provide:"ISell_DetailsService",useClass:Sell_DetailsService,},{provide:"IProviderService",useClass:ProviderService,},SellRepository,ProductRepository,ProviderRepository,Sell_DetailsRepository,CategoryRepository,ClientRepository],
    controllers:[SellController]
})
export class SellModule{};