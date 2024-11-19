import { Injectable } from "@nestjs/common";
import { Provider } from "../models";
import { ProviderRepository } from "../repository";
import { createProviderDTO } from "../dtos";
import { IProviderService } from "./interfaces";

@Injectable()
export class ProviderService implements IProviderService {
    constructor(private readonly providerRepository: ProviderRepository){};

    getProviderByName(providerName:string):Promise<Provider>{
        return this.providerRepository.getProviderByName(providerName);
    }

    getProviders(): Promise<Provider[]>{
        return this.providerRepository.getProviders();
    }

    getProviderById(id: number): Promise<Provider>{
        return this.providerRepository.getProviderById(id);
    }

    getProvidersByIds (ids: number[]): Promise<Provider[]>{
        return this.providerRepository.getProvidersByIds(ids);
    }

    createProvider(provider: createProviderDTO): Promise<Provider>{
        return this.providerRepository.createProvider(provider);
    }

    updateProvider(id:number, providerDTO: createProviderDTO): Promise<Provider>{
        return this.providerRepository.updateProvider(id, providerDTO);
    }

    deleteProvider(id: number): Promise<string>{
        return this.providerRepository.deleteProviderById(id);
    }
}