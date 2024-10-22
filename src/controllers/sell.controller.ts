import { Controller, Get, Param, Body, Post, Put, Delete, Inject } from "@nestjs/common";
import {Sell} from "../models/sell.entity";
import { createSellDTO } from "../dtos/createSellDTO";
import { ISellService } from "src/service/interfaces/ISell.service";

@Controller("sell")
export class SellController{
    constructor(@Inject("ISellService") private readonly sellService: ISellService){}

    @Get("")
    getAllSells():Promise<Sell[]>{
        return this.sellService.getAllSells();
    }

    @Get("/:id")
    getSellById(@Param("id") id:number):Promise<Sell>{
        return this.sellService.getSellById(id);
    }

    @Post("/create")
    createSell(@Body() sell: createSellDTO):Promise<Sell>{
        return this.sellService.createSell(sell);
    }

    @Put("/update/:id")
    updateSell(@Body() sell: createSellDTO, @Param("id") id:number): Promise<Sell>{
        return this.sellService.updateSell(sell,id);
    }

    @Delete("/delete/:id")
    deleteSell(@Param("id") id :number):Promise<String>{
        return this.sellService.deleteSell(id);
    }
}