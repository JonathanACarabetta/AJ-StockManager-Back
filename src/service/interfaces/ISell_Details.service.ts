import { ProductsInSell } from "src/dtos/createSellDTO";
import { Sell_Details } from "src/models/sell_details.entity";

export interface ISell_DetailsService{
    /**
     * @description creates a new array of Sell_Details
     * @param productsInSell ProductsInSell
     * @returns Sell_Details[]
     */
    createSell_details(productsInSell: ProductsInSell[]): Promise<Sell_Details[]>
}