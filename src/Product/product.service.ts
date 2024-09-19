import { Injectable } from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { Product } from "./product.entity";

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository){}

    getProducts():Promise<Product[]>{
        return this.productRepository.getAllProducts();
    }

    getProductById(id:number):Promise<Product>{
        return this.productRepository.getProductById(id);
    }

    createProduct(product: Partial<Product>){
        return this.productRepository.createProduct(product);
    }

    updateProduct(id: number, updatedProduct: Partial<Product>): Promise<Product>{
        return this.productRepository.updateProduct(id, updatedProduct);
    }

    deleteProduct(id:number): Promise<String>{
        return this.productRepository.deleteProduct(id);
    }
}