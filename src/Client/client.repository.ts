import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Client } from "./client.entity";
import { Repository } from "typeorm";

@Injectable()
export class ClientRepository {
    constructor(@InjectRepository(Client) private clientReposiroty: Repository<Client>){}
    
    async getAllClients(): Promise<Client[]>{
        try {
            return await this.clientReposiroty.find();
        } catch (error) {
            throw new NotFoundException(`Error al traer todos los clientes: ${error.message}`);
        }
    }

    async getClientById(id: number): Promise<Client>{
        try {
            const client = await this.clientReposiroty.findOneBy({id:id});
            if(!client) throw new NotFoundException('Cliente no encontrado');
            return client;
        } catch (error) {
            throw new NotFoundException(`Cliente con id ${id} no encontrado`)
        }
    }

    async createClient(client: Partial<Client>): Promise<Client>{
        try {
            return await this.clientReposiroty.save(client);
        } catch (error) {
            throw new NotFoundException(`Error al crear el cliente: ${error.message}`);
        }
    }

    async updateClient(id: number, client: Partial<Client>): Promise<Client>{
        try {
            const updatedClient = await this.clientReposiroty.update(id, client);
            if(updatedClient.affected === 0) throw new NotFoundException('Cliente no encontrado');
            return await this.getClientById(id);
        } catch (error) {
            throw new NotFoundException(`Error al actualizar el cliente con id ${id}: ${error.message}`);
        }
    }

    async deleteClient(id: number): Promise<string>{
        try {
            const client = await this.clientReposiroty.findOneBy({id:id});
            if(!client) throw new NotFoundException(`Cliente con id ${id} no encontrado`);
            client.isDeleted=true;
            const deletedClient = await this.clientReposiroty.update(id,client);
            if(deletedClient.affected === 0) throw new NotFoundException('Cliente no encontrado');
            return 'Cliente eliminado exitosamente';
        } catch (error) {
            throw new NotFoundException(`Error al eliminar el cliente con id ${id}: ${error.message}`);
        }
    }
}