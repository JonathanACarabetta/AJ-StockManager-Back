import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./category.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoryRepository{
    constructor(
        @InjectRepository(Category) private categoryRepository: Repository<Category>
    ){}

    async findAll(): Promise<Category[]>{
        try {
            return await this.categoryRepository.find();
        } catch (error) {
            throw new NotFoundException("Error al traer las Categorias");
        }
    }

    async findOneById(id: number): Promise<Category>{
        try {
            const category = await this.categoryRepository.findOneBy({id:id});
            if(!category){
                throw new NotFoundException(`La Categoria con id ${id} no existe`);
            }
            return category;
        } catch (error) {
            throw new NotFoundException(`Error al obtener la Categoria con id ${id}`);
        }
    }

    async createCategory(category: Partial<Category>): Promise<Category>{
        try {
            const createdCategory = await this.categoryRepository.save(category);
            return createdCategory;
        } catch (error) {
            throw new NotFoundException("Error al crear la categoria");
        }
    }

    async updateCategory(id: number, category: Partial<Category>): Promise<Category>{
        try {
            const updatedCategory = await this.categoryRepository.update(id, category);
            if(updatedCategory.affected === 0){
                throw new NotFoundException(`La Categoria con id ${id} no existe`);
            }
            return await this.findOneById(id);
        } catch (error) {
            throw new NotFoundException(`Error al actualizar la Categoria con id ${id}`);
        }
    }

    async deleteCategory(id: number): Promise<string>{
        try {
            const category = await this.findOneById(id);
            category.isDeleted =true;
            const deletedCategory = await this.categoryRepository.update(id,category);
            if(deletedCategory.affected === 0){
                throw new NotFoundException(`La Categoria con id ${id} no existe`);
            }
            return "Categoría eliminada exitosamente";
        } catch (error) {
            throw new NotFoundException(`Error al eliminar la Categoria con id ${id}`);
        }
    }

}