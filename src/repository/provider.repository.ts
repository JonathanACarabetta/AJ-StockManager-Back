import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Provider } from "../models/provider.entity";
import { Raw, Repository } from "typeorm";

@Injectable()
export class ProviderRepository {
    constructor(@InjectRepository(Provider) private providerRepository: Repository<Provider>) { }
    async getProviderByName(providerName: string): Promise<Provider> {
        try {
            const upperSearch = providerName.toUpperCase();
            return await this.providerRepository.findOne({
                where: {
                    name: Raw((alias) => `UPPER(${alias}) LIKE UPPER(:search)`, {
                        search: `%${upperSearch}%`
                    }),
                }, relations: ["products"]
            })
        } catch (error) {
            throw new NotFoundException("Error al traer el proveedor");
        }
    }

    async getProviders(): Promise<Provider[]> {
        try {
            return await this.providerRepository.find();
        } catch (error) {
            throw new NotFoundException("Error al traer los proveedores: "+error.message);
        }
    }

    async getProviderById(id: number): Promise<Provider> {
        try {
            const provider = await this.providerRepository.findOne({ where: { id: id }, relations: ["products"] });
            if (!provider) throw new NotFoundException("Proveedor no encontrado");
            return provider;
        } catch (error) {
            throw new NotFoundException("Error al traer el proveedor: "+error.message);
        }
    }

    async createProvider(provider: Partial<Provider>): Promise<Provider> {
        try {
            return await this.providerRepository.save(provider);
        } catch (error) {
            throw new NotFoundException("Error al crear el proveedor: "+error.message);
        }
    }

    async updateProvider(id:number,providerDTO: Partial<Provider>): Promise<Provider>{
        try {
            const provider = await this.providerRepository.findOneBy({id:id});
            provider.address = providerDTO.address;
            provider.name = providerDTO.name;
            return await this.providerRepository.save(provider);
        } catch (error) {
            throw new NotFoundException("Error al actualizar el proveedor: "+error.message);
        }
    }

    async deleteProviderById(id: number): Promise<string> {
        try {
            await this.providerRepository.delete(id);
            return `Proveedor con id: ${id}. Eliminado correctamente`;
        } catch (error) {
            throw new NotFoundException("Error al eliminar el proveedor: "+error.message);
        }
    }
}