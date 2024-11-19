import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Sell, Product } from "../models";
import { Repository } from "typeorm";
import { createSellDTO, MonthInfo } from "../dtos";
import { ISell_DetailsService, IProductService, IClientService } from "../service/interfaces";

@Injectable()
export class SellRepository {
    constructor(
        @InjectRepository(Sell) private sellRepository: Repository<Sell>,
        @Inject("ISell_DetailsService") private readonly sell_detailsService: ISell_DetailsService,
        @Inject("IClientService") private readonly clientService: IClientService,
        @Inject("IProductService") private readonly productService: IProductService,
    ) { }

    async getAllSells(): Promise<Sell[]> {
        try {
            return await this.sellRepository.find({ relations: ["client", "details"] });
        } catch (error) {
            throw new NotFoundException("Error al traer las ventas");
        }
    }

    async getSellById(id: number): Promise<Sell> {
        try {
            const sell = await this.sellRepository.findOne({ where: { id: id }, relations: ["client", "details"] });
            if (!sell) throw new NotFoundException(`La venta con id ${id} no existe`);
            return sell;
        } catch (error) {
            throw new NotFoundException(`La venta con id ${id} no existe`);
        }
    }

    async getSellsByMonth(month: number, year: number): Promise<Sell[]> {
        try {
            const sellsByMonth = await this.sellRepository.createQueryBuilder(`sell`)
                .where(`EXTRACT(MONTH FROM sell.date) = :month`, { month })
                .leftJoinAndSelect("sell_details", "SellDetails")
                .leftJoin("product", "products")
                .andWhere(`EXTRACT(YEAR FROM sell.date) = :year`, { year })
                .getMany()
            return sellsByMonth;
        } catch (error) {
            throw new NotFoundException(`No existen ventas para este mes`)
        }
    }

    async getSellsInfoByMonth(month: number, year: number): Promise<MonthInfo> {
        try {
            const sellsByMonth = await this.getSellsByMonth(month, year);
            const productMap = new Map();
            let total = 0;
            sellsByMonth.forEach((sell) => {
                sell.detail.products.forEach((product) => {
                    if (!productMap.has(product.id)) {
                        productMap.set(product.id, 1)
                    } else {
                        productMap.set(product.id, productMap.get(product.id) + 1)
                    }
                })
                total = sell.detail.total + total;
            });
            const mostTimesSelled = {
                id: 0,
                timesSelled: 0
            }
            productMap.forEach((value, key) => {
                if (value > mostTimesSelled.timesSelled) {
                    mostTimesSelled.id = key;
                    mostTimesSelled.timesSelled = value;
                }
            })
            const mostSelledProduct:Product= await this.productService.getProductById(mostTimesSelled.id);
            return {
                most_Selled_product:mostSelledProduct,
                period: {
                    month: month,
                    year:year
                },
                total:total
            };

        } catch (error) {
            throw new NotFoundException(`No existen ventas para este mes`)
        }
    }

    async createSell(sellDto: createSellDTO): Promise<Sell> {
        try {
            const sell: Sell = new Sell();
            sell.bill_type = sellDto.bill_type;
            sell.pay_method = sellDto.pay_method;
            sell.client = await this.clientService.getClientById(sellDto.client_id);
            sell.detail = await this.sell_detailsService.createSell_details(sellDto.products);
            return await this.sellRepository.save(sell);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async updateSell(id: number, sellDto: createSellDTO): Promise<Sell> {
        try {
            const sell: Sell = new Sell();
            sell.bill_type = sellDto.bill_type;
            sell.pay_method = sellDto.pay_method;
            sell.client = await this.clientService.getClientById(sellDto.client_id);
            sell.detail = await this.sell_detailsService.createSell_details(sellDto.products);
            return await this.sellRepository.save(sell);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async deleteSell(id: number): Promise<String> {
        try {
            const result = await this.sellRepository.delete(id);
            if (result.affected === 0) throw new NotFoundException(`La venta con id ${id} no existe`);
            return `Venta con id ${id} eliminada correctamente`;
        } catch (error) {
            throw new NotFoundException(`Error al eliminar la venta con id ${id}: ${error.message}`);
        }
    }
}