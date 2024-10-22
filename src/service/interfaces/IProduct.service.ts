import { CreateProductDTO } from "../../dtos/createProductDTO";
import { ProductsInSell } from "../../dtos/createSellDTO";
import { EditPriceCost } from "../../dtos/editPriceCost";
import { Product } from "../../models/product.entity";

export interface IProductService{
    /**
     * @description finds all products
     * @return list of products - Product[]
     * */
    getProducts():Promise<Product[]>

    /**
     * @description find a list of products by provider name
     * @param provider string
     * @returns list of products - Product[]
     */
    getProductsByProvider(provider:string):Promise<Product[]>

    /**
     * @description find a list of products by Category name
     * @param category string
     * @returns list of products - Product[]
     */
    getProductsByCategory(category:string): Promise<Product[]>
    
    /**
     * @description finds a product by id
     * @param id number
     * @returns Product
     */
    getProductById(id:number):Promise<Product>
    
    /**
     * @description finds all the products witch match the ids 
     * @param ids number[]
     * @returns list of products - Product[]
     */
    getProductsByIds(ids:number[]):Promise<Product[]>
    
    /**
     * @description updates the stock of one product
     * @param productToUpdate ProductsInSell
     * @returns Product
     */
    updateStock(productToUpdate:ProductsInSell):Promise<Product>
    
    /**
     * @description creates a product
     * @param productDTO CreateProductDTO
     * @returns Product
     */
    createProduct(productDTO: CreateProductDTO):Promise<Product>
    
    /**
     * @description updates an existing product using the id and a DTO for updatable data
     * @param id number
     * @param productDTO CreateProductDTO
     * @returns Product
     */
    updateProduct(id: number, productDTO: CreateProductDTO): Promise<Product>
    
    /**
     * @description Updates the actual price or cost of a list of products using the DTO
     * @param products EditPriceCost[]
     * @returns string
     */
    updatePriceAndCost(products: EditPriceCost[]): Promise<String>
    
    /**
     * @description delete products using an id
     * @param id number
     * @returns string
     */
    deleteProduct(id:number): Promise<String>
}