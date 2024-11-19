import { ProductsInSell } from "../../dtos";
import { Sell_Details } from "../../models";

export interface ISell_DetailsService{
    /**
     * @description creates a new array of Sell_Details
     * @param productsInSell ProductsInSell
     * @returns Sell_Details[]
     */
    createSell_details(productsInSell: ProductsInSell[]): Promise<Sell_Details>
}