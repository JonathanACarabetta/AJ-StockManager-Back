import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In, Raw } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.entity";
import { CategoryService } from "../Category/category.service";
import { CreateProductDTO } from "./dto/createProductDTO";
import { EditPriceCost } from "./dto/editPriceCost";
import { ProductsInSell } from "src/Sell/dto/createSellDTO";

@Injectable()
export class ProductRepository {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
        private readonly categoryService: CategoryService
    ) { };



    async getAllProducts(): Promise<Product[]> {
        try {
            const products = await this.productRepository.find();
            return products;
        } catch (error) {
            throw new NotFoundException("Error al obtener todos los productos");
        }
    }

    async getProductsByProvider(provider: string): Promise<Product[]> {
        try {
            const upperSearch = provider.toUpperCase();
            const productsByProviderName = await this.productRepository.find({
                where: {
                    provider_name: Raw((alias) => `${alias} ILIKE :search`, {
                        search: `%${upperSearch}%`,
                    }),
                }
            });
            return productsByProviderName;
        } catch (error) {
            console.log(error);
        }
    }

    async getProductsByCategory(category: string): Promise<Product[]> {
        try {
            const categoryByName = await this.categoryService.getCategoryByName(category);
            return categoryByName.products;
        } catch (error) {
            throw new NotFoundException("Error al traer Categoria o nombre no existe");
        }
    }

    async getProductById(id: number): Promise<Product> {
        try {
            const product = await this.productRepository.findOne({ where: { id: id }, relations: ["categories"] });
            if (!product) {
                throw new NotFoundException(`El producto con id ${id} no existe`);
            }
            return product;
        } catch (error) {
            throw new NotFoundException(`Error al obtener el producto con id ${id}`);
        }
    }

    async getProductsByIds(ids: number[]): Promise<Product[]> {
        try {
            return await this.productRepository.findBy({ id: In(ids) });
        } catch (error) {
            throw new NotFoundException(`Error al obtener los productos`)
        }
    }

    async updateStock(productToUpdate: ProductsInSell): Promise<Product> {
        try {
            const product = await this.productRepository.findOneBy({ id: productToUpdate.productId });
            product.stock = product.stock - productToUpdate.quantity;
            return await this.productRepository.save(product);;
        } catch (error) {
            throw new NotFoundException(`Error al actualizar los productos`)
        }
    }

    async createProduct(productDTO: CreateProductDTO): Promise<Product> {
        try {
            const product: Partial<Product> = {
                name: productDTO.name,
                cost: productDTO.cost,
                price: productDTO.price,
                stock: productDTO.stock,
                bar_code: productDTO.bar_code,
                brand: productDTO.brand,
                provider_name: productDTO.provider_name
            };
            if (productDTO.categories.length > 0) {
                const categories = await this.categoryService.getCategoriesByIds(productDTO.categories)
                product.categories = categories;
            }
            const createdProduct = await this.productRepository.save(product);
            return createdProduct;
        } catch (error) {
            console.log(error);

            throw new NotFoundException("Error al crear el producto");
        }
    }

    async updateProduct(id: number, productDTO: CreateProductDTO): Promise<Product> {
        try {
            const product = await this.getProductById(id);
            product.name = productDTO.name;
            product.cost = productDTO.cost;
            product.price = productDTO.price;
            product.stock = productDTO.stock;
            product.bar_code = productDTO.bar_code;
            product.brand = productDTO.brand;
            product.provider_name = productDTO.provider_name;

            if (productDTO.categories.length > 0) {
                const categories = await this.categoryService.getCategoriesByIds(productDTO.categories)
                product.categories = categories;
            }
            await this.productRepository.save(product);
            return product;
        } catch (error) {
            console.log(error);

            throw new NotFoundException(`Error al actualizar el producto con id ${id}`);
        }
    }

    async updatePriceAndCost(products: EditPriceCost[]): Promise<String> {
        try {
            products.forEach(async product => {
                try {
                    const productToUpdate = await this.getProductById(product.id);
                    if (product.price != null) productToUpdate.price = product.price;
                    if (product.cost != null) productToUpdate.cost = product.cost;
                    await this.productRepository.save(productToUpdate);
                } catch (error) {
                    console.log(error);

                }
            });
            return `Precios y/o Costos Actualizados`;
        } catch (error) {
            console.log(error);
            throw new NotFoundException("Error al actualizar precios y costos de productos");
        }
    }

    async deleteProduct(id: number): Promise<String> {
        try {
            const result = await this.productRepository.delete(id);
            if (result.affected === 0) {
                throw new NotFoundException(`El producto con id ${id} no existe`);
            }
            return `Producto con id ${id} eliminado exitosamente`;
        } catch (error) {
            throw new NotFoundException(`Error al eliminar el producto con id ${id}`);
        }
    }

}