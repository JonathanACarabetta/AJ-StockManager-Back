import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "../models/category.entity";
import { In, Repository, Raw } from "typeorm";

@Injectable()
export class CategoryRepository {
    constructor(
        @InjectRepository(Category) private categoryRepository: Repository<Category>
    ) { }

    async findAll(): Promise<Category[]> {
        try {
            return await this.categoryRepository.find({where: { isDeleted: false }});
        } catch (error) {
            throw new NotFoundException("Error al traer las Categorias");
        }
    }

    async findOneById(id: number): Promise<Category> {
        try {
            const category = await this.categoryRepository.findOne({ where: { id: id, isDeleted: false }, relations: ["products"] });
            if (!category) {
                throw new NotFoundException(`La Categoria con id ${id} no existe`);
            }
            return category;
        } catch (error) {
            throw new NotFoundException(`Error al obtener la Categoria con id ${id}`);
        }
    }

    async getCategoriesByIds (ids: Number[]): Promise<Category[]>{
        try {
            return await this.categoryRepository.findBy({id:In(ids)});
        } catch (error) {
            throw new NotFoundException("Error al obtener las categorias por ids");
        }
    }

    async getCategoryByName(categoryName:string):Promise<Category>{
        try{
            const upperSearch = categoryName.toUpperCase();
            return await this.categoryRepository.findOne({where: {
                name: Raw((alias) => `UPPER(${alias}) LIKE UPPER(:search)`, {
                    search: `%${upperSearch}%`}),
            },relations:["products"]})
        }catch (error) {
            throw new NotFoundException("Error al traer categoria");
        }
    }

    async createCategory(category: Partial<Category>): Promise<Category> {
        try {
            category.isDeleted = false;
            category.name = category.name.toUpperCase();
            const createdCategory = await this.categoryRepository.save(category);
            return createdCategory;
        } catch (error) {
            throw new NotFoundException("Error al crear la categoria o el nombre ya existe");
        }
    }

    async updateCategory(id: number, category: Partial<Category>): Promise<Category> {
        try {
            const updatedCategory = await this.categoryRepository.update(id, category);
            if (updatedCategory.affected === 0) {
                throw new NotFoundException(`La Categoria con id ${id} no existe`);
            }
            return await this.findOneById(id);
        } catch (error) {
            throw new NotFoundException(`Error al actualizar la Categoria con id ${id}`);
        }
    }

    async deleteCategory(id: number): Promise<string> {
        try {
            const category = await this.categoryRepository.findOneBy({id:id});
            category.isDeleted = true;
            const deletedCategory = await this.categoryRepository.update(id, category);
            if (deletedCategory.affected === 0) {
                throw new NotFoundException(`La Categoria con id ${id} no existe`);
            }
            return `Categoría con id ${id} eliminada exitosamente`;
        } catch (error) {
            throw new NotFoundException(`Error al eliminar la Categoria con id ${id}`);
        }
    }

}