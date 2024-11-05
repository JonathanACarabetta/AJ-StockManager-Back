import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/models/category.entity";
import { Product } from "src/models/product.entity";
import { Provider } from "src/models/provider.entity";
import { dataLoader } from "../helpers/dataLoader";
import { ProductService } from "src/service/product.service";
import { ProviderService } from "src/service/Provider.service";
import { CategoryService } from "src/service/category.service";
import { ProductRepository } from "src/repository/product.repository";
import { ProviderRepository } from "src/repository/Provider.repository";
import { CategoryRepository } from "src/repository/category.repository";


@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, Provider]),
  ],
  providers: [
    { provide: "IProductService", useClass: ProductService, },
    { provide: "IProviderService", useClass: ProviderService, },
    { provide: "ICategoryService", useClass: CategoryService, },
    ProductRepository,
    ProviderRepository,
    CategoryRepository,
    dataLoader,
  ],
})
export class SeedersModule { }
