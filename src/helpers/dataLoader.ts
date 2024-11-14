import { Category } from "../models/category.entity";
import { categories, providers, products } from "../utils/data"
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ICategoryService } from "../service/interfaces/ICategory.service.js";
import { IProductService } from "../service/interfaces/IProduct.service.js";
import { IProviderService } from "../service/interfaces/IProvider.service.js";
import { CreateProductDTO } from "../dtos/createProductDTO";
import { createProviderDTO } from "../dtos/createProviderDTO";

@Injectable()
export class dataLoader implements OnModuleInit{
    constructor(
        @Inject("ICategoryService") private readonly categoryService: ICategoryService,
        @Inject("IProductService") private readonly productService: IProductService,
        @Inject("IProviderService") private readonly providerService: IProviderService)
        {}

        async onModuleInit(){
            try {
                await this.loadCategories();
                await this.loadProviders();
                await this.loadProducts();
            } catch (error) {
                console.log(error.message);
            }
        }
    async loadCategories() {
        try {
            const p = await this.categoryService.getCategories();
            if(p.length >= 1) throw new Error("La Base de Datos ya posee registros");
            categories.forEach((cat: Partial<Category>) => {
                this.categoryService.createCategory(cat);
            });
            console.log(`Categorias cargadas correctamente`);
        } catch (error) {
            throw error;
        }
    }
    async loadProviders() {
        try {
            const p = await this.providerService.getProviders();
            if(p.length >= 1) throw new Error("La Base de Datos ya posee registros");
            providers.forEach((prov: createProviderDTO) => {
                this.providerService.createProvider(prov);
            });
            console.log(`Proveedores cargados correctamente`);
        } catch (error) {
            throw error;
        }
    }
    async loadProducts() {
        try {
            const p = await this.productService.getProducts();
            if(p.length >= 1) throw new Error("La Base de Datos ya posee registros");
            products.forEach((prod: CreateProductDTO) => {
                this.productService.createProduct(prod);
            });
            console.log(`Productos cargados correctamente`);
        } catch (error) {
            throw error;
        }
    }

}


