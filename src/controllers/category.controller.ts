import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from "@nestjs/common";
import { Category } from "../models/category.entity";
import { ICategoryService } from "src/service/interfaces/ICategory.service";
import { Roles } from "src/utils/roles.enum";
import { Role } from "src/decorators/role.decorator";
import { AuthenticationGuard } from "src/guards/authentication.guard";
import { AuthorizationGuard } from "src/guards/authorization.guard";

@Controller("categories")
export class CategoryController{
    constructor(@Inject("ICategoryService")private readonly categoryService: ICategoryService){}

    @Get("")
    @UseGuards(AuthenticationGuard)
    getCategories():Promise<Category[]>{
        return this.categoryService.getCategories();
    }

    @Get("/:id")
    @UseGuards(AuthenticationGuard)
    getCategoryById(@Param("id") id: number): Promise<Category>{
        return this.categoryService.getCategoryById(id);
    }

    @Post("/create")
    @Role(Roles.ADMIN)
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    createCategory(@Body() category: Partial<Category>):Promise<Category>{
        return this.categoryService.createCategory(category);
    }

    @Put("/update/:id")
    @Role(Roles.ADMIN)
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    updateCategory(@Body() updatedCategory: Partial<Category>, @Param("id") id: number): Promise<Category>{
        return this.categoryService.updateCategory(id, updatedCategory);
    }

    @Delete("/delete/:id")
    @Role(Roles.ADMIN)
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    deleteCategory(@Param("id") id: number): Promise<String>{
        return this.categoryService.deleteCategory(id);
    }
}