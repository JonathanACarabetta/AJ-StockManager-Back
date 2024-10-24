import { Controller, Get, Param, Body, Post, Put, Delete, Inject, UseGuards } from "@nestjs/common";
import {Sell} from "../models/sell.entity";
import { createSellDTO } from "../dtos/createSellDTO";
import { ISellService } from "src/service/interfaces/ISell.service";
import { AuthenticationGuard } from "src/guards/authentication.guard";
import { AuthorizationGuard } from "src/guards/authorization.guard";
import { Role } from "src/decorators/role.decorator";
import { Roles } from "src/utils/roles.enum";

@Controller("sell")
export class SellController{
    constructor(@Inject("ISellService") private readonly sellService: ISellService){}

    @Get("")
    @UseGuards(AuthenticationGuard)
    getAllSells():Promise<Sell[]>{
        return this.sellService.getAllSells();
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
    @Role(Roles.ADMIN)
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    deleteSell(@Param("id") id :number):Promise<String>{
        return this.sellService.deleteSell(id);
    }
}