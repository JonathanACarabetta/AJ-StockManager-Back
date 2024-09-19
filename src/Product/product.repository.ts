import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NotFoundError } from "rxjs";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.entity";

@Injectable()
export class ProductRepository{
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>
    ){};

    async getAllProducts(): Promise<Product[]>{
        try {
            const products = await this.productRepository.find();
            return products;
        } catch (error) {
            throw new NotFoundException("Error al obtener todos los productos");
        }
    }

    async getProductById(id: number): Promise<Product>{
        try {
            const product = await this.productRepository.findOneBy({id:id});
            if(!product){
                throw new NotFoundException(`El producto con id ${id} no existe`);
            }
            return product;
        } catch (error) {
            throw new NotFoundException(`Error al obtener el producto con id ${id}`);
        }
    }

    async createProduct(product: Partial<Product>): Promise<Product>{
        try {
            const createdProduct = await this.productRepository.save(product);
            return createdProduct;
        } catch (error) {
            throw new NotFoundException("Error al crear el producto");
        }
    }

    async updateProduct(id: number, product: Partial<Product>): Promise<Product>{
        try {
            const updatedProduct = await this.productRepository.update(id, product);
            if(updatedProduct.affected === 0){
                throw new NotFoundException(`El producto con id ${id} no existe`);
            }
            return await this.getProductById(id);
        } catch (error) {
            throw new NotFoundException(`Error al actualizar el producto con id ${id}`);
        }
    }

    async deleteProduct(id: number): Promise<String>{
        try {
            const result = await this.productRepository.delete(id);
            if(result.affected === 0){
                throw new NotFoundException(`El producto con id ${id} no existe`);
            }
            return "Producto eliminado exitosamente";
        } catch (error) {
            throw new NotFoundException(`Error al eliminar el producto con id ${id}`);
        }
    }

}