import { Controller, Get, Param, Post, Body, Put, Delete, Inject } from "@nestjs/common";
import { Client } from "../models/client.entity";
import { createClientDTO } from "../dtos/createClientDTO";
import { IClientService } from "src/service/interfaces/IClient.service";

@Controller("clients")
export class ClientController{
    constructor(@Inject("IClientService")private readonly clientService:IClientService){}

    @Get("")
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