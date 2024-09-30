import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Sell } from "./sell.entity";
import { Double, Repository } from "typeorm";
import { createSellDTO } from "./dto/createSellDTO";
import { ProductService } from "../Product/product.service"
import { log } from "console";
import { ClientService } from "../Client/client.service";
import { UpdateSellDTO } from "./dto/updateSellDTO";

@Injectable()
export class SellRepository {
    constructor(@InjectRepository(Sell) private sellRepository: Repository<Sell>,
        private readonly productService: ProductService,
        private readonly clientService: ClientService) { }

    async getAllSells(): Promise<Sell[]> {
        try {
            return await this.sellRepository.find();
        } catch (error) {
            throw new NotFoundException("Error al traer las ventas");
        }
    }

    async getSellById(id: number): Promise<Sell> {
        try {
            const sell = await this.sellRepository.findOne({ where: { id: id }, relations: ["client", "products"] });
            if (!sell) throw new NotFoundException(`La venta con id ${id} no existe`);
            return sell;
        } catch (error) {
            throw new NotFoundException(`La venta con id ${id} no existe`);
        }
    }

    async createSell(sellDto: createSellDTO): Promise<Sell> {
        try {
            const sell: Partial<Sell> = {
                pay_method: sellDto.pay_method,
                bill_type: sellDto.bill_type
            }
            sell.client = await this.clientService.getClientById(sellDto.client_id);
            sell.products = await this.productService.getProductsByIds(sellDto.products);
            let aux: number = 0;
            sell.products.forEach((product) => {
                aux = product.price + aux;
            })
            sell.total = aux;
            return await this.sellRepository.save(sell);
        } catch (error) {
            throw new NotFoundException("Error al crear la venta");
        }
    }

    async updateSell(id: number, sellDto: createSellDTO): Promise<Sell> {
        try {
            const sell = await this.getSellById(id);
            sell.pay_method = sellDto.pay_method;
            sell.bill_type = sellDto.bill_type;
            sell.client = await this.clientService.getClientById(sellDto.client_id);
            sell.products = await this.productService.getProductsByIds(sellDto.products);
            let aux: number = 0;
            sell.products.forEach((product) => {
                aux = product.price + aux;
            })
            sell.total = aux;
            await this.sellRepository.save(sell);
            return sell;
        } catch (error) {
            console.log(error);
            throw new NotFoundException(`Error al actualizar la venta con id ${id}`);
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