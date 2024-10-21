import { createSellDTO } from "src/dtos/createSellDTO"
import { Sell } from "src/models/sell.entity"

export interface ISellService{
    /**
     * @description finds all Sells
     * @returns Sell[]
     */
    getAllSells():Promise<Sell[]>

    /**
     * @description finds a Sell by Id
     * @param id number
     * @returns Sell
     */
    getSellById(id:number):Promise<Sell>

    /**
     * @description creates a new Sell
     * @param sellDTO createSellDTO
     * @returns Sell
     */
    createSell(sellDTO: createSellDTO):Promise<Sell>

    /**
     * @description updates an existing Sell using it's id and the DTO
     * @param sellDTO createSellDTO
     * @param id number
     * @returns Sell
     */
    updateSell(sellDTO: createSellDTO, id:number):Promise<Sell>

    /**
     * @description deletes a Sell by id
     * @param id number
     * @returns String
     */
    deleteSell(id:number):Promise<String>
}