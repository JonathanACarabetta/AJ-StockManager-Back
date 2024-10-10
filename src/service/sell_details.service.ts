import { Injectable } from "@nestjs/common"
import { Sell_DetailsRepository } from "../repository/sell_details.repository"
import { ProductsInSell } from "../dtos/createSellDTO";
import { Sell_Details } from "../models/sell_details.entity";

@Injectable()
export class Sell_DetailsService{
    constructor(private readonly sell_detailsRepository:Sell_DetailsRepository){}

    createSell_details(productsInSell: ProductsInSell[]): Promise<Sell_Details[]> {
        return this.sell_detailsRepository.createSell_details(productsInSell);
    }
}