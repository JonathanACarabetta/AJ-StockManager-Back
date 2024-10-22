import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { Product } from "../models/product.entity";
import { CreateProductDTO } from "../dtos/createProductDTO";
import { EditPriceCost } from "../dtos/editPriceCost";
import { updateProductPriceAndCostInterceptor } from "../interceptors/updateProductPriceAndCost.interceptor";
import { IProductService } from "src/service/interfaces/IProduct.service";


@Controller("product")
export class ProductController{
    constructor(@Inject("IProductService") private readonly productService: IProductService){}

    @Get()
    getProducts():Promise<Product[]>{
        return this.productService.getProducts();
    }

    @Get("/filter_by_provider/:provider")
    getProductsByProvider(@Param("provider") provider: string):Promise<Product[]>{
        return this.productService.getProductsByProvider(provider);
    }

    @Get("/filter_by_category/:category")
    getProductsByCategory(@Param("category") category: string):Promise<Product[]>{
        return this.productService.getProductsByCategory(category);
    }

    @Get("/:id")
    getProductById(@Param("id") id:number):Promise<Product>{
        return this.productService.getProductById(id);
    }

    @Post("/create")
    createProduct(@Body() productDTO: CreateProductDTO):Promise<Product>{
        return this.productService.createProduct(productDTO);
    }

    @Put("/update/cost_and_price")
    @UseInterceptors(updateProductPriceAndCostInterceptor)
    updatePriceAndCost(@Body()filteredProducts:EditPriceCost[]):Promise<String>{
        return this.productService.updatePriceAndCost(filteredProducts);
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