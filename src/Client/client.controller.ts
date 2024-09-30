import { Controller, Get, Param, Post, Body, Put, Delete } from "@nestjs/common";
import { ClientService } from "./client.service";
import { Client } from "./client.entity";
import { createClientDTO } from "./dto/createClientDTO";

@Controller("clients")
export class ClientController{
    constructor(private readonly clientService:ClientService){}

    @Get("")
    getAllClients():Promise<Client[]>{
        return this.clientService.getAllClients();
    }

    @Get("/:id")
    getClientById(@Param("id") id: number):Promise<Client>{
        return this.clientService.getClientById(id);
    }

    @Post("/create")
    createClient(@Body()clientDTO: createClientDTO):Promise<Client>{
        return this.clientService.createClient(clientDTO);
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