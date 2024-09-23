import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.entity";
import { CategoryService } from "../Category/category.service";
import { CreateProductDTO } from "./DTOs/createProductDTO";

@Injectable()
export class ProductRepository{
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
        private readonly categoryService: CategoryService
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
            const product = await this.productRepository.findOne({where:{id:id},relations : ["categories"]});
            if(!product){
                throw new NotFoundException(`El producto con id ${id} no existe`);
            }
            return product;
        } catch (error) {
            throw new NotFoundException(`Error al obtener el producto con id ${id}`);
        }
    }

    async createProduct(productDTO: CreateProductDTO): Promise<Product>{
        try {
            const product: Partial<Product> = {
                name:productDTO.name,
                cost: productDTO.cost,
                price: productDTO.price,
                stock: productDTO.stock,
                bar_code: productDTO.bar_code,
                brand: productDTO.brand
            };
            if(productDTO.categories.length > 0){
                const categories = await this.categoryService.getCategoriesByIds(productDTO.categories)
                product.categories = categories;
            }
            const createdProduct = await this.productRepository.save(product);
            return createdProduct;
        } catch (error) {
            throw new NotFoundException("Error al crear el producto");
        }
    }

    async updateProduct(id: number, productDTO: CreateProductDTO): Promise<Product>{
        try {
            const product: Partial<Product> = {
                name:productDTO.name,
                cost: productDTO.cost,
                price: productDTO.price,
                stock: productDTO.stock,
                bar_code: productDTO.bar_code,
                brand: productDTO.brand
            };
            if(productDTO.categories.length > 0){
                const categories = await this.categoryService.getCategoriesByIds(productDTO.categories)
                product.categories = categories;
            }
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