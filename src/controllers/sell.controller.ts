import { Controller, Get, Param, Body, Post, Put, Delete, Inject, UseGuards, Query } from "@nestjs/common";
import {Sell} from "../models";
import { createSellDTO, MonthInfo } from "../dtos";
import { ISellService } from "../service/interfaces";
import { AuthenticationGuard, AuthorizationGuard } from "../guards";
import { Role } from "../decorators/role.decorator";
import { Roles } from "../utils/roles.enum";

@Controller("sell")
export class SellController{
    constructor(@Inject("ISellService") private readonly sellService: ISellService){}

    @Get("")
    @UseGuards(AuthenticationGuard)
    getAllSells():Promise<Sell[]>{
        return this.sellService.getAllSells();
    }

    @Get("/admin-info/month")
    @UseGuards(AuthenticationGuard)
    getSellsByMonth(@Query("month") month:string, @Query("year") year:string):Promise<Sell[]>{
        return this.sellService.getSellsByMonth(month,year);
    }

    @Get("/admin-info/month/totals")
    @UseGuards(AuthenticationGuard)
    getSellsInfoByMonth(@Query("month") month:string, @Query("year") year:string):Promise<MonthInfo>{
        return this.sellService.getSellsInfoByMonth(month,year);
    }

    @Get("/:id")
    @UseGuards(AuthenticationGuard)
    getSellById(@Param("id") id:number):Promise<Sell>{
        return this.sellService.getSellById(id);
    }

    @Post("/create")
    @UseGuards(AuthenticationGuard)
    createSell(@Body() sell: createSellDTO):Promise<Sell>{
        return this.sellService.createSell(sell);
    }

    @Put("/update/:id")
    @UseGuards(AuthenticationGuard)
    updateSell(@Body() sell: createSellDTO, @Param("id") id:number): Promise<Sell>{
        return this.sellService.updateSell(sell,id);
    }

    @Delete("/delete/:id")
    @Role(Roles.USER)
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    deleteSell(@Param("id") id :number):Promise<String>{
        return this.sellService.deleteSell(id);
    }
}