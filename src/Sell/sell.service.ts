import { Injectable } from "@nestjs/common";
import { SellRepository } from "./sell.repository";
import { Sell } from "./sell.entity";
import { createSellDTO } from "./dto/createSellDTO";

@Injectable()
export class SellService{
    constructor(private readonly sellRepository:SellRepository){}

    getAllSells():Promise<Sell[]>{
        return this.sellRepository.getAllSells();
    }

    getSellById(id:number):Promise<Sell>{
        return this.sellRepository.getSellById(id);
    }

    createSell(sellDTO: createSellDTO):Promise<Sell>{
        return this.sellRepository.createSell(sellDTO);
    }
    
    updateSell(sellDTO: createSellDTO, id:number):Promise<Sell>{
        return this.sellRepository.updateSell(id,sellDTO);
    }

    deleteSell(id:number):Promise<String>{
        return this.sellRepository.deleteSell(id);
    }
}