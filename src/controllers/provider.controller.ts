import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from "@nestjs/common";
import { Provider } from "../models";
import { createProviderDTO } from "../dtos";
import { IProviderService } from "../service/interfaces";
import { Role } from "../decorators/role.decorator";
import { Roles } from "../utils/roles.enum";
import { AuthenticationGuard, AuthorizationGuard } from "../guards";

@Controller("provider")
export class ProviderController{
    constructor(@Inject("IProviderService") private readonly providerService: IProviderService){};

    @Get()
    @UseGuards(AuthenticationGuard)
    getProviders():Promise<Provider[]>{
        return this.providerService.getProviders();
    }

    @Get("/find_By_Id/:id")
    @UseGuards(AuthenticationGuard)
    getProviderById(@Param("id") id:number):Promise<Provider>{
        return this.providerService.getProviderById(id);
    }

    @Post("/create")
    @Role(Roles.USER)
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    createProvider(@Body() createProviderDTO:createProviderDTO):Promise<Provider>{
        return this.providerService.createProvider(createProviderDTO);
    }

    @Put("/update/:id")
    @Role(Roles.USER)
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    updateProvider(@Param("id") id:number, @Body() updateProviderDTO:createProviderDTO):Promise<Provider>{
        return this.providerService.updateProvider(id,updateProviderDTO);
    }

    @Delete("/delete/:id")
    @Role(Roles.USER)
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    deleteProviderById(@Param("id") id:number):Promise<string>{
        return this.providerService.deleteProvider(id);
    }
}