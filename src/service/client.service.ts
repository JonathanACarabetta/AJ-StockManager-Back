import { Injectable } from "@nestjs/common";
import { ClientRepository } from "../repository";
import { Client } from "../models";
import { createClientDTO } from "../dtos";
import { IClientService } from "./interfaces";

@Injectable()
export class ClientService implements IClientService{
    constructor(private readonly clientRepository: ClientRepository){}
    getClientByEmail(email: string): Promise<Client> {
        return this.clientRepository.getClientByEmail(email);
    }

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