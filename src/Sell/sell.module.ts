import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sell } from "./sell.entity";
import { SellRepository } from "./sell.repository";
import { SellService } from "./sell.service";
import { SellController} from "./sell.controller";
import { ProductService } from "../Product/product.service";
import { ProductRepository } from "../Product/product.repository";
import { Product } from "../Product/product.entity";
import { CategoryService } from "../Category/category.service";
import { CategoryRepository } from "../Category/category.repository";
import { Category } from "../Category/category.entity";
import { Client } from "../Client/client.entity"
import { ClientService } from "../Client/client.service";
import { ClientRepository } from "../Client/client.repository";
import { Sell_Details } from "src/Sell_Details/sell_details.entity";
import { Sell_DetailsService } from "src/Sell_Details/sell_details.service";
import { Sell_DetailsRepository } from "src/Sell_Details/sell_details.repository";

@Module({
    imports:[TypeOrmModule.forFeature([Sell,Product,Category,Client,Sell_Details])],
    providers:[SellRepository, SellService, ProductService, ProductRepository, CategoryService, CategoryRepository, ClientRepository, ClientService,Sell_DetailsService,Sell_DetailsRepository],
    controllers:[SellController]
})
export class SellModule{};