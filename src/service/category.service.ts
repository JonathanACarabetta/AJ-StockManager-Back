import { Injectable } from "@nestjs/common";
import { CategoryRepository } from "../repository/category.repository";
import { Category } from "../models/category.entity";
import { ICategoryService } from "./interfaces/ICategory.service";

@Injectable()
export class CategoryService implements ICategoryService{
    constructor(private readonly categoryRepository: CategoryRepository){}

    getCategories():Promise<Category[]>{
        return this.categoryRepository.findAll();
    }

    getCategoryById(id:number):Promise<Category>{
        return this.categoryRepository.findOneById(id);
    }

    getCategoriesByIds(ids:number[]):Promise<Category[]>{
        return this.categoryRepository.getCategoriesByIds(ids);
    }

    getCategoryByName(category:string):Promise<Category>{
        return this.categoryRepository.getCategoryByName(category);
    }

    createCategory(category:Partial<Category>):Promise<Category>{
        return this.categoryRepository.createCategory(category);
    }

    updateCategory(id:number, updatedCategory: Partial<Category>):Promise<Category>{
        return this.categoryRepository.updateCategory(id, updatedCategory);
    }

    deleteCategory(id:number):Promise<String>{
        return this.categoryRepository.deleteCategory(id);
    }
}