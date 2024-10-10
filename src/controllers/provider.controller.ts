import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProviderService } from "../service/Provider.service";
import { Provider } from "src/models/provider.entity";

@Controller("provider")
export class ProviderController{
    constructor(private readonly providerService: ProviderService){};

    @Get()
    getProviders():Promise<Provider[]>{
        return this.providerService.getProviders();
    }

    @Get("/find_By_Id/:id")
    getProviderById(@Param("id") id:number):Promise<Provider>{
        return this.providerService.getProviderById(id);
    }

    @Post("/create")
    createProvider(@Body() createProviderDTO:Partial<Provider>):Promise<Provider>{
        return this.providerService.createProvider(createProviderDTO);
    }

    @Put("/update/:id")
    updateProvider(@Param("id") id:number, @Body() updateProviderDTO:Partial<Provider>):Promise<Provider>{
        return this.providerService.updateProvider(id,updateProviderDTO);
    }

    @Delete("/delete/:id")
    deleteProviderById(@Param("id") id:number):Promise<string>{
        return this.providerService.deleteProvider(id);
    }
}