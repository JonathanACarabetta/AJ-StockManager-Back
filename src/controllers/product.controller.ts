import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { Product } from "../models/product.entity";
import { CreateProductDTO } from "../dtos/createProductDTO";
import { EditPriceCost } from "../dtos/editPriceCost";
import { updateProductPriceAndCostInterceptor } from "../interceptors/updateProductPriceAndCost.interceptor";
import { IProductService } from "src/service/interfaces/IProduct.service";
import { Roles } from "src/utils/roles.enum";
import { Role } from "src/decorators/role.decorator";
import { AuthenticationGuard } from "src/guards/authentication.guard";
import { AuthorizationGuard } from "src/guards/authorization.guard";


@Controller("product")
export class ProductController{
    constructor(@Inject("IProductService") private readonly productService: IProductService){}

    @Get()
    @UseGuards(AuthenticationGuard)
    getProducts():Promise<Product[]>{
        return this.productService.getProducts();
    }

    @Get("/filter_by_provider/:provider")
    @UseGuards(AuthenticationGuard)
    getProductsByProvider(@Param("provider") provider: string):Promise<Product[]>{
        return this.productService.getProductsByProvider(provider);
    }

    @Get("/filter_by_category/:category")
    @UseGuards(AuthenticationGuard)
    getProductsByCategory(@Param("category") category: string):Promise<Product[]>{
        return this.productService.getProductsByCategory(category);
    }

    @Get("/:id")
    @UseGuards(AuthenticationGuard)
    getProductById(@Param("id") id:number):Promise<Product>{
        return this.productService.getProductById(id);
    }

    @Post("/create")
    @Role(Roles.ADMIN)
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    createProduct(@Body() productDTO: CreateProductDTO):Promise<Product>{
        return this.productService.createProduct(productDTO);
    }

    @Put("/update/cost_and_price")
    @UseGuards(AuthenticationGuard)
    @UseInterceptors(updateProductPriceAndCostInterceptor)
    updatePriceAndCost(@Body()filteredProducts:EditPriceCost[]):Promise<String>{
        return this.productService.updatePriceAndCost(filteredProducts);
    }

    @Put("/update/:id")
    @Role(Roles.ADMIN)
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    updateProduct(@Body() productDTO: CreateProductDTO,@Param("id") id:number):Promise<Product>{
        return this.productService.updateProduct(id, productDTO);
    }


    @Delete("/delete/:id")
    @Role(Roles.ADMIN)
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    deleteProduct(@Param("id") id:number):Promise<String>{
        return this.productService.deleteProduct(id);
    }
}