import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from "@nestjs/common";
import { Category } from "../models/category.entity";
import { ICategoryService } from "src/service/interfaces/ICategory.service";

@Controller("categories")
export class CategoryController{
    constructor(@Inject("ICategoryService")private readonly categoryService: ICategoryService){}

    @Get("")
    getCategories():Promise<Category[]>{
        return this.categoryService.getCategories();
    }

    @Get("/:id")
    getCategoryById(@Param("id") id: number): Promise<Category>{
        return this.categoryService.getCategoryById(id);
    }

    @Post("/create")
    createCategory(@Body() category: Partial<Category>):Promise<Category>{
        return this.categoryService.createCategory(category);
    }

    @Put("/update/:id")
    updateCategory(@Body() updatedCategory: Partial<Category>, @Param("id") id: number): Promise<Category>{
        return this.categoryService.updateCategory(id, updatedCategory);
    }

    @Delete("/delete/:id")
    deleteCategory(@Param("id") id: number): Promise<String>{
        return this.categoryService.deleteCategory(id);
    }
}