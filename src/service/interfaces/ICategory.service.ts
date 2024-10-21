import { Category } from "src/models/category.entity";

export interface ICategoryService{
    /**
     * @description find and return all categories
     * @returns Category[]
     */
    getCategories():Promise<Category[]>

    /**
     * @description find and return category by id
     * @param id number
     * @returns Category
     */
    getCategoryById(id:number):Promise<Category>

    /**
     * @description find and return categories by ids
     * @param ids number[]
     * @returns Category[]
     */
    getCategoriesByIds(ids:number[]):Promise<Category[]>

    /**
     * @description find and return category by name
     * @param category string
     * @returns Category
     */
    getCategoryByName(category:string):Promise<Category>

    /**
     * @description create a new category
     * @param category Partial<Category>
     * @returns Category
     */
    createCategory(category:Partial<Category>):Promise<Category>

    /**
     * @description update an existing category
     * @param id number
     * @param updatedCategory Partial<Category>
     * @returns updated category Category
     **/
    updateCategory(id:number, updatedCategory: Partial<Category>):Promise<Category>

    /**
     * @description delete an existing category
     * @param id number
     * @returns string
     */
    deleteCategory(id:number):Promise<String>
}