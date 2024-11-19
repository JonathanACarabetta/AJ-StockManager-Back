import { Injectable } from "@nestjs/common"
import { Sell_DetailsRepository } from "../repository"
import { ProductsInSell } from "../dtos";
import { Sell_Details } from "../models";
import { ISell_DetailsService } from "./interfaces";

@Injectable()
export class Sell_DetailsService implements ISell_DetailsService{
    constructor(private readonly sell_detailsRepository:Sell_DetailsRepository){}

    createSell_details(productsInSell: ProductsInSell[]): Promise<Sell_Details> {
        return this.sell_detailsRepository.createSell_details(productsInSell);
    }
}