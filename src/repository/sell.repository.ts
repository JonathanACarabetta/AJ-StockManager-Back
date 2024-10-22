import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Sell } from "../models/sell.entity";
import { Repository } from "typeorm";
import { createSellDTO } from "../dtos/createSellDTO";
import { ISell_DetailsService } from "src/service/interfaces/ISell_details.service";
import { IClientService } from "src/service/interfaces/IClient.service";

@Injectable()
export class SellRepository {
    constructor(@InjectRepository(Sell) private sellRepository: Repository<Sell>,
        @Inject("ISell_DetailsService") private readonly sell_detailsService: ISell_DetailsService,
        @Inject("IClientService") private readonly clientService: IClientService) { }

    async getAllSells(): Promise<Sell[]> {
        try {
            return await this.sellRepository.find({relations: ["client", "details"]});
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

    async createSell(sellDto: createSellDTO): Promise<Sell> {
        try {
            const sell: Sell = new Sell();
            sell.bill_type = sellDto.bill_type;
            sell.pay_method = sellDto.pay_method;
            sell.client = await this.clientService.getClientById(sellDto.client_id);
            sell.details = await this.sell_detailsService.createSell_details(sellDto.products);
            let aux = 0;
            sell.details.forEach((detail)=>{
                aux = detail.total + aux;
            })
            sell.total = aux;
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
            sell.details = await this.sell_detailsService.createSell_details(sellDto.products);
            let aux = 0;
            sell.details.forEach((detail)=>{
                aux = detail.total + aux;
            })
            sell.total = aux;
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