import { Controller, Get, Param, Body, Post, Put, Delete } from "@nestjs/common";
import { SellService } from "./sell.service";
import {Sell} from "./sell.entity";

@Controller("sell")
export class SellController{
    constructor(private readonly sellService: SellService){}

    @Get("")
    getAllSells():Promise<Sell[]>{
        return this.sellService.getAllSells();
    }

    @Get("/:id")
    getSellById(@Param("id") id:number):Promise<Sell>{
        return this.sellService.getSellById(id);
    }

    @Post("/create")
    createSell(@Body() sell: Partial<Sell>):Promise<Sell>{
        return this.sellService.createSell(sell);
    }

    @Put("/update/:id")
    updateSell(@Body() sell: Partial<Sell>, @Param("id") id:number): Promise<Sell>{
        return this.sellService.updateSell(sell,id);
    }

    @Delete("/delete/:id")
    deleteSell(@Param("id") id :number):Promise<String>{
        return this.sellService.deleteSell(id);
    }
}