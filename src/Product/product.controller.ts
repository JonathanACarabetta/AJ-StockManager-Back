import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product } from "./product.entity";


@Controller("product")
export class ProductController{
    constructor(private readonly productService: ProductService){}

    @Get()
    getProducts():Promise<Product[]>{
        return this.productService.getProducts();
    }

    @Get(":id")
    getProductById(@Param("id") id:number):Promise<Product>{
        return this.productService.getProductById(id);
    }

    @Post("/create")
    createProduct(@Body() product: Partial<Product>):Promise<Product>{
        return this.productService.createProduct(product);
    }

    @Put("/update/:id")
    updateProduct(@Body() updatedProduct: Partial<Product>,@Param("id") id:number):Promise<Product>{
        return this.productService.updateProduct(id, updatedProduct);
    }

    @Delete("/delete/:id")
    deleteProduct(@Param("id") id:number):Promise<String>{
        return this.productService.deleteProduct(id);
    }
}