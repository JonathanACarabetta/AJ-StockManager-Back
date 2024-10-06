import { Injectable } from "@nestjs/common";
import { CategoryRepository } from "./category.repository";
import { Category } from "./category.entity";

@Injectable()
export class CategoryService {
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