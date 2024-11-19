import { Controller, Get, Param, Post, Body, Put, Delete, Inject, UseGuards } from "@nestjs/common";
import { Client } from "../models";
import { createClientDTO } from "../dtos";
import { IClientService } from "../service/interfaces";
import { Role } from "../decorators/role.decorator";
import { Roles } from "../utils/roles.enum";
import { AuthenticationGuard, AuthorizationGuard } from "../guards";

@Controller("clients")
export class ClientController{
    constructor(@Inject("IClientService")private readonly clientService:IClientService){}

    @Get("")
    @Role(Roles.USER)
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    getAllClients():Promise<Client[]>{
        return this.clientService.getAllClients();
    }

    @Get("/:id")
    @UseGuards(AuthenticationGuard)
    getClientById(@Param("id") id: number):Promise<Client>{
        return this.clientService.getClientById(id);
    }

    @Post("/create")
    @Role(Roles.USER)
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    createClient(@Body()clientDTO: createClientDTO):Promise<Client>{
        return this.clientService.createClient(clientDTO);
    }

    @Put("/update/:id")
    @Role(Roles.USER)
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    updateClient(@Body()clientDTO: createClientDTO, @Param("id") id : number):Promise<Client>{
        return this.clientService.updateClient(id,clientDTO);
    }

    @Delete("/delete/:id")
    @Role(Roles.USER)
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    deleteClient(@Param("id") id: number):Promise<String>{
        return this.clientService.deleteClient(id);
    }
}