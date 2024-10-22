import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Sell_Details } from "../models/sell_details.entity";
import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ProductsInSell } from "../dtos/createSellDTO";
import { IProductService } from "src/service/interfaces/IProduct.service";

@Injectable()
export class Sell_DetailsRepository {
    constructor(@InjectRepository(Sell_Details) private sell_detailsRepository: Repository<Sell_Details>,
        @Inject("IProductService") private readonly productService: IProductService) { }
    async createSell_details(productsInSell: ProductsInSell[]): Promise<Sell_Details[]> {
        try {
            const sells_details: Sell_Details[] = await Promise.all(
                productsInSell.map(async (productInSell) => {
                    try {
                        const sell_detail: Sell_Details = new Sell_Details();
                        const product = await this.productService.getProductById(productInSell.productId);
                        if (product.stock < productInSell.quantity) throw new BadRequestException("No hay suficiente Stock para realizar la venta")

                        sell_detail.product = await this.productService.updateStock(productInSell);
                        sell_detail.quantity = productInSell.quantity;
                        sell_detail.total = product.price * productInSell.quantity;
                        return sell_detail;
                    } catch (error) {
                        throw error;
                    }
                }))
            return await this.sell_detailsRepository.save(sells_details);
        } catch (error) {
            throw error;
        }
    }
}