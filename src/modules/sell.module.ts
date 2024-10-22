import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductService } from "../service/product.service";
import { Product } from "../models/product.entity";
import { CategoryService } from "../service/category.service";
import { Category } from "../models/category.entity";
import { Client } from "../models/client.entity"
import { ClientService } from "../service/client.service";
import { Sell_Details } from "../models/sell_details.entity";
import { Sell_DetailsService } from "../service/sell_details.service";
import { Sell } from "../models/sell.entity";
import { SellService } from "../service/sell.service";
import { SellController } from "../controllers/sell.controller";
import { Provider } from "../models/provider.entity";
import { ProviderService } from "../service/Provider.service";
import { ProviderRepository } from "../repository/Provider.repository";
import { SellRepository } from "src/repository/sell.repository";
import { ProductRepository } from "src/repository/product.repository";
import { Sell_DetailsRepository } from "src/repository/sell_details.repository";
import { CategoryRepository } from "src/repository/category.repository";
import { ClientRepository } from "src/repository/client.repository";

@Module({
    imports:[TypeOrmModule.forFeature([Sell,Product,Category,Client,Sell_Details, Provider])],
    providers:[{provide:"ISellService",useClass:SellService,},{provide:"IProductService",useClass:ProductService,},{provide:"ICategoryService",useClass:CategoryService,},{provide:"IClientService",useClass:ClientService,},{provide:"ISell_DetailsService",useClass:Sell_DetailsService,},{provide:"IProviderService",useClass:ProviderService,},SellRepository,ProductRepository,ProviderRepository,Sell_DetailsRepository,CategoryRepository,ClientRepository],
    controllers:[SellController]
})
export class SellModule{};