import { Injectable } from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { Product } from "./product.entity";
import { CreateProductDTO } from "./dto/createProductDTO";
import { EditPriceCost } from "./dto/editPriceCost";
import { ProductsInSell } from "src/Sell/dto/createSellDTO";

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository){}

    getProducts():Promise<Product[]>{
        return this.productRepository.getAllProducts();
    }

    getProductsByProvider(provider:string):Promise<Product[]>{
        return this.productRepository.getProductsByProvider(provider);
    }

    getProductsByCategory(category:string): Promise<Product[]>{
        return this.productRepository.getProductsByCategory(category);
    }

    getProductById(id:number):Promise<Product>{
        return this.productRepository.getProductById(id);
    }

    getProductsByIds(ids:number[]):Promise<Product[]>{
        return this.productRepository.getProductsByIds(ids);
    }

    updateStock(productToUpdate:ProductsInSell):Promise<Product>{
        return this.productRepository.updateStock(productToUpdate);
    }

    createProduct(productDTO: CreateProductDTO){
        return this.productRepository.createProduct(productDTO);
    }

    updateProduct(id: number, productDTO: CreateProductDTO): Promise<Product>{
        return this.productRepository.updateProduct(id, productDTO);
    }

    updatePriceAndCost(products: EditPriceCost[]): Promise<String>{
        return this.productRepository.updatePriceAndCost(products);
    }

    deleteProduct(id:number): Promise<String>{
        return this.productRepository.deleteProduct(id);
    }
}