import { Category } from "../models/category.entity";
import { categories, providers, products, users } from "../utils/data"
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ICategoryService } from "../service/interfaces/ICategory.service.js";
import { IProductService } from "../service/interfaces/IProduct.service.js";
import { IProviderService } from "../service/interfaces/IProvider.service.js";
import { CreateProductDTO } from "../dtos/createProductDTO";
import { createProviderDTO } from "../dtos/createProviderDTO";
import { IClientService } from "src/service/interfaces/IClient.service";
import { createClientDTO } from "src/dtos/createClientDTO";
import { IAuthService } from "src/service/interfaces/IAuth.service";

@Injectable()
export class dataLoader implements OnModuleInit {
    constructor(
        @Inject("ICategoryService") private readonly categoryService: ICategoryService,
        @Inject("IProductService") private readonly productService: IProductService,
        @Inject("IProviderService") private readonly providerService: IProviderService,
        @Inject("IClientService") private readonly clientService: IClientService,
        @Inject("IAuthService") private readonly authService: IAuthService) { }

    async onModuleInit() {
        try {
            await this.loadCategories();
            await this.loadProviders();
            await this.loadProducts();
            await this.loadUsers();
        } catch (error) {
            console.log(error.message);
        }
    }
    async loadCategories() {
        try {
            const cat = await this.categoryService.getCategories();
            if (cat.length >= 1) throw new Error("La Base de Datos ya posee registros");
            categories.forEach(async(cat: Partial<Category>) => {
                await this.categoryService.createCategory(cat);
            });
            console.log(`Categorias cargadas correctamente`);
        } catch (error) {
            throw error;
        }
    }
    async loadProviders() {
        try {
            const prov = await this.providerService.getProviders();
            if (prov.length >= 1) throw new Error("La Base de Datos ya posee registros");
            providers.forEach(async(prov: createProviderDTO) => {
                await this.providerService.createProvider(prov);
            });
            console.log(`Proveedores cargados correctamente`);
        } catch (error) {
            throw error;
        }
    }
    async loadProducts() {
        try {
            const prod = await this.productService.getProducts();
            if (prod.length >= 1) throw new Error("La Base de Datos ya posee registros");
            products.forEach(async(prod: CreateProductDTO) => {
                await this.productService.createProduct(prod);
            });
            console.log(`Productos cargados correctamente`);
        } catch (error) {
            throw error;
        }
    }

    async loadUsers() {
        try {
            const user = await this.clientService.getAllClients();
            if (user.length >= 1) throw new Error("La Base de Datos ya posee registros");
            users.forEach(async (user: createClientDTO) => {
                await this.authService.singUp(user);
            })
            console.log(`Usuarios Cargador Correctamente`);
        } catch (error) {
            throw error;
        }
    }

}


