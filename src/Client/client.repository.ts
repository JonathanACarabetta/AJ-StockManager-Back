import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Client } from "./client.entity";
import { Repository } from "typeorm";
import { createClientDTO } from "./dto/createClientDto";

@Injectable()
export class ClientRepository {
    constructor(@InjectRepository(Client) private clientReposiroty: Repository<Client>){}
    
    async getAllClients(): Promise<Client[]>{
        try {
            return await this.clientReposiroty.find({where:{isDeleted:false}});
        } catch (error) {
            throw new NotFoundException(`Error al traer todos los clientes: ${error.message}`);
        }
    }

    async getClientById(id: number): Promise<Client>{
        try {
            const client = await this.clientReposiroty.findOneBy({id:id,isDeleted:false});
            if(!client) throw new NotFoundException('Cliente no encontrado');
            return client;
        } catch (error) {
            throw new NotFoundException(`Cliente con id ${id} no encontrado`)
        }
    }

    async createClient(clientDTO: createClientDTO): Promise<Client>{
        try {
            const client: Partial<Client> = {
                name:clientDTO.name,
                phone_number:clientDTO.phone_number,
                address:clientDTO.address,
                email:clientDTO.email,
                cuit:clientDTO.cuit,
                fiscal_key: clientDTO.fiscal_key,
                isDeleted: false,
            };
            return await this.clientReposiroty.save(client);
        } catch (error) {
            throw new NotFoundException(`Error al crear el cliente: ${error.message}`);
        }
    }

    async updateClient(id: number, clientDTO: createClientDTO): Promise<Client>{
        try {
            const client: Partial<Client> = {
                name:clientDTO.name,
                phone_number:clientDTO.phone_number,
                address:clientDTO.address,
                email:clientDTO.email,
                cuit:clientDTO.cuit,
                fiscal_key: clientDTO.fiscal_key,
                isDeleted: false,
            };
            const updatedClient = await this.clientReposiroty.update(id, client);
            if(updatedClient.affected === 0) throw new NotFoundException('Cliente no encontrado');
            return await this.getClientById(id);
        } catch (error) {
            throw new NotFoundException(`Error al actualizar el cliente con id ${id}: ${error.message}`);
        }
    }

    async deleteClient(id: number): Promise<string>{
        try {
            const client = await this.clientReposiroty.findOneBy({id:id,isDeleted:false});
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