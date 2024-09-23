import { Injectable } from "@nestjs/common";
import { ClientRepository } from "./client.repository";
import { Client } from "./client.entity";

@Injectable()
export class ClientService{
    constructor(private readonly clientRepository: ClientRepository){}

    getAllClients():Promise<Client[]>{
        return this.clientRepository.getAllClients();
    }

    getClientById(id:number):Promise<Client>{
        return this.clientRepository.getClientById(id);
    }

    createClient(client: Partial<Client>):Promise<Client>{
        return this.clientRepository.createClient(client);
    }

    updateClient(id:number, client: Partial<Client>):Promise<Client>{
        return this.clientRepository.updateClient(id, client);
    }

    deleteClient(id:number):Promise<string>{
        return this.clientRepository.deleteClient(id);
    }
}