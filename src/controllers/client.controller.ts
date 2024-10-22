import { Controller, Get, Param, Post, Body, Put, Delete, Inject, UseGuards } from "@nestjs/common";
import { Client } from "../models/client.entity";
import { createClientDTO } from "../dtos/createClientDTO";
import { IClientService } from "src/service/interfaces/IClient.service";
import { Role } from "src/decorators/role.decorator";
import { Roles } from "src/utils/roles.enum";
import { AuthenticationGuard } from "src/guards/authentication.guard";
import { AuthorizationGuard } from "src/guards/authorization.guard";

@Controller("clients")
export class ClientController{
    constructor(@Inject("IClientService")private readonly clientService:IClientService){}

    @Get("")
    @Role(Roles.ADMIN)
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    getAllClients():Promise<Client[]>{
        return this.clientService.getAllClients();
    }

    @Get("/:id")
    getClientById(@Param("id") id: number):Promise<Client>{
        return this.clientService.getClientById(id);
    }

    @Put("/update/:id")
    updateClient(@Body()clientDTO: createClientDTO, @Param("id") id : number):Promise<Client>{
        return this.clientService.updateClient(id,clientDTO);
    }

    @Delete("/delete/:id")
    deleteClient(@Param("id") id: number):Promise<String>{
        return this.clientService.deleteClient(id);
    }
}