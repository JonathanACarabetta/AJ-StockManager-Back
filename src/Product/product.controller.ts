import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product } from "./product.entity";
import { CreateProductDTO } from "./DTOs/createProductDTO";


@Controller("product")
export class ProductController{
    constructor(private readonly productService: ProductService){}

    @Get()
    getProducts():Promise<Product[]>{
        return this.productService.getProducts();
    }

    @Get("/:id")
    getProductById(@Param("id") id:number):Promise<Product>{
        return this.productService.getProductById(id);
    }

    @Post("/create")
    createProduct(@Body() productDTO: CreateProductDTO):Promise<Product>{
        return this.productService.createProduct(productDTO);
    }

    @Put("/update/:id")
    updateProduct(@Body() productDTO: CreateProductDTO,@Param("id") id:number):Promise<Product>{
        return this.productService.updateProduct(id, productDTO);
    }

    @Delete("/delete/:id")
    deleteProduct(@Param("id") id:number):Promise<String>{
        return this.productService.deleteProduct(id);
    }
}