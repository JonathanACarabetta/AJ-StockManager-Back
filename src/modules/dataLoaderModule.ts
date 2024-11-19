import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataLoader } from "../helpers/dataLoader";
import { Category, Client, Product, Provider } from "../models";
import { CategoryRepository, ClientRepository, ProductRepository, ProviderRepository } from "../repository";
import { AuthService, CategoryService, ClientService, ProductService, ProviderService } from "../service";


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
