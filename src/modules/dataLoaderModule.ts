import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "../models/category.entity";
import { Product } from "../models/product.entity";
import { Provider } from "../models/provider.entity";
import { dataLoader } from "../helpers/dataLoader";
import { ProductService } from "../service/product.service";
import { ProviderService } from "../service/Provider.service";
import { CategoryService } from "../service/category.service";
import { ProductRepository } from "../repository/product.repository";
import { ProviderRepository } from "../repository/Provider.repository";
import { CategoryRepository } from "../repository/category.repository";
import { ClientService } from "../service/client.service";
import { ClientRepository } from "../repository/client.repository";
import { Client } from "../models/client.entity";
import { AuthService } from "src/service/auth.service";


@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, Provider,Client]),
  ],
  providers: [
    { provide: "IProductService", useClass: ProductService, },
    { provide: "IProviderService", useClass: ProviderService, },
    { provide: "ICategoryService", useClass: CategoryService, },
    { provide: "IClientService", useClass: ClientService},
    { provide: "IAuthService", useClass: AuthService},
    ClientRepository,
    ProductRepository,
    ProviderRepository,
    CategoryRepository,
    dataLoader,
  ],
})
export class SeedersModule { }
