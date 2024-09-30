import { Injectable } from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { Product } from "./product.entity";
import { CreateProductDTO } from "./dto/createProductDTO";

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository){}

    getProducts():Promise<Product[]>{
        return this.productRepository.getAllProducts();
    }

    getProductById(id:number):Promise<Product>{
        return this.productRepository.getProductById(id);
    }

    getProductsByIds(ids:number[]):Promise<Product[]>{
        return this.productRepository.getProductsByIds(ids);
    }

    createProduct(productDTO: CreateProductDTO){
        return this.productRepository.createProduct(productDTO);
    }

    updateProduct(id: number, productDTO: CreateProductDTO): Promise<Product>{
        return this.productRepository.updateProduct(id, productDTO);
    }

    deleteProduct(id:number): Promise<String>{
        return this.productRepository.deleteProduct(id);
    }
}