import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Sell } from "./sell.entity";
import { Repository } from "typeorm";

@Injectable()
export class SellRepository{
    constructor(@InjectRepository(Sell) private sellRepository:Repository<Sell>){}
    
    async getAllSells(): Promise<Sell[]>{
        try {
            return await this.sellRepository.find();
        } catch (error) {
            throw new NotFoundException("Error al traer las ventas");
        }
    }

    async getSellById(id: number): Promise<Sell>{
        try {
            const sell = await this.sellRepository.findOne({where: {id: id},relations:["client","products"]});
            if(!sell)throw new NotFoundException(`La venta con id ${id} no existe`);
            return sell;
        } catch (error) {
            throw new NotFoundException(`La venta con id ${id} no existe`);
        }
    }

    async createSell(sell: Partial<Sell>): Promise<Sell>{
        try {
            return await this.sellRepository.save(sell);
        } catch (error) {
            throw new NotFoundException("Error al crear la venta");
        }
    }

    async updateSell(id: number, sell: Partial<Sell>): Promise<Sell>{
        try {
            const updatedSell = await this.sellRepository.update(id, sell);
            if(updatedSell.affected === 0) throw new NotFoundException(`La venta con id ${id} no existe`);
            return await this.getSellById(id);
        } catch (error) {
            throw new NotFoundException(`Error al actualizar la venta con id ${id}`);
        }
    }

    async deleteSell(id: number): Promise<String>{
        try {
            const result = await this.sellRepository.delete(id);
            if(result.affected === 0) throw new NotFoundException(`La venta con id ${id} no existe`);
            return `Venta con id ${id} eliminada correctamente`;
        } catch (error) {
            throw new NotFoundException(`Error al eliminar la venta con id ${id}: ${error.message}`);
        }
    }
}