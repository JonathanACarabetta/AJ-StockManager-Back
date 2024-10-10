import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductService } from "../service/product.service";
import { ProductRepository } from "../repository/product.repository";
import { Product } from "../models/product.entity";
import { CategoryService } from "../service/category.service";
import { CategoryRepository } from "../repository/category.repository";
import { Category } from "../models/category.entity";
import { Client } from "../models/client.entity"
import { ClientService } from "../service/client.service";
import { ClientRepository } from "../repository/client.repository";
import { Sell_Details } from "../models/sell_details.entity";
import { Sell_DetailsService } from "../service/sell_details.service";
import { Sell_DetailsRepository } from "../repository/sell_details.repository";
import { Sell } from "../models/sell.entity";
import { SellService } from "../service/sell.service";
import { SellController } from "../controllers/sell.controller";
import { SellRepository } from "../repository/sell.repository";

@Module({
    imports:[TypeOrmModule.forFeature([Sell,Product,Category,Client,Sell_Details])],
    providers:[SellRepository, SellService, ProductService, ProductRepository, CategoryService, CategoryRepository, ClientRepository, ClientService,Sell_DetailsService,Sell_DetailsRepository],
    controllers:[SellController]
})
export class SellModule{};