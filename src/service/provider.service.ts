import { Injectable } from "@nestjs/common";
import { Provider } from "../models/provider.entity";
import { ProviderRepository } from "../repository/Provider.repository";

@Injectable()
export class ProviderService {
    constructor(private readonly providerRepository: ProviderRepository){};

    public getProviderByName(providerName:string):Promise<Provider>{
        return this.providerRepository.getProviderByName(providerName);
    }

    public getProviders(): Promise<Provider[]>{
        return this.providerRepository.getProviders();
    }

    public getProviderById(id: number): Promise<Provider>{
        return this.providerRepository.getProviderById(id);
    }

    public createProvider(provider: Partial<Provider>): Promise<Provider>{
        return this.providerRepository.createProvider(provider);
    }

    public updateProvider(id:number, providerDTO: Partial<Provider>): Promise<Provider>{
        return this.providerRepository.updateProvider(id, providerDTO);
    }

    public deleteProvider(id: number): Promise<string>{
        return this.providerRepository.deleteProviderById(id);
    }
}