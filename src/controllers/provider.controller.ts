import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from "@nestjs/common";
import { Provider } from "../models/provider.entity";
import { createProviderDTO } from "../dtos/createProviderDTO";
import { IProviderService } from "src/service/interfaces/IProvider.service";

@Controller("provider")
export class ProviderController{
    constructor(@Inject("IProviderService") private readonly providerService: IProviderService){};

    @Get()
    getProviders():Promise<Provider[]>{
        return this.providerService.getProviders();
    }

    @Get("/find_By_Id/:id")
    getProviderById(@Param("id") id:number):Promise<Provider>{
        return this.providerService.getProviderById(id);
    }

    @Post("/create")
    createProvider(@Body() createProviderDTO:createProviderDTO):Promise<Provider>{
        return this.providerService.createProvider(createProviderDTO);
    }

    @Put("/update/:id")
    updateProvider(@Param("id") id:number, @Body() updateProviderDTO:createProviderDTO):Promise<Provider>{
        return this.providerService.updateProvider(id,updateProviderDTO);
    }

    @Delete("/delete/:id")
    deleteProviderById(@Param("id") id:number):Promise<string>{
        return this.providerService.deleteProvider(id);
    }
}