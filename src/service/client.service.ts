import { Injectable } from "@nestjs/common";
import { ClientRepository } from "../repository/client.repository";
import { Client } from "../models/client.entity";
import { createClientDTO } from "../dtos/createClientDTO";

@Injectable()
export class ClientService{
    constructor(private readonly clientRepository: ClientRepository){}

    getAllClients():Promise<Client[]>{
        return this.clientRepository.getAllClients();
    }

    getClientById(id:number):Promise<Client>{
        return this.clientRepository.getClientById(id);
    }

    createClient(clientDTO: createClientDTO):Promise<Client>{
        return this.clientRepository.createClient(clientDTO);
    }

    updateClient(id:number, clientDTO: createClientDTO):Promise<Client>{
        return this.clientRepository.updateClient(id, clientDTO);
    }

    deleteClient(id:number):Promise<string>{
        return this.clientRepository.deleteClient(id);
    }
}