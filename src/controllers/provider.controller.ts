import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from "@nestjs/common";
import { Provider } from "../models/provider.entity";
import { createProviderDTO } from "../dtos/createProviderDTO";
import { IProviderService } from "src/service/interfaces/IProvider.service";
import { Role } from "src/decorators/role.decorator";
import { Roles } from "src/utils/roles.enum";
import { AuthenticationGuard } from "src/guards/authentication.guard";
import { AuthorizationGuard } from "src/guards/authorization.guard";

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
    @Role(Roles.ADMIN)
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    createProvider(@Body() createProviderDTO:createProviderDTO):Promise<Provider>{
        return this.providerService.createProvider(createProviderDTO);
    }

    @Put("/update/:id")
    @Role(Roles.ADMIN)
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    updateProvider(@Param("id") id:number, @Body() updateProviderDTO:createProviderDTO):Promise<Provider>{
        return this.providerService.updateProvider(id,updateProviderDTO);
    }

    @Delete("/delete/:id")
    @Role(Roles.ADMIN)
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    deleteProviderById(@Param("id") id:number):Promise<string>{
        return this.providerService.deleteProvider(id);
    }
}