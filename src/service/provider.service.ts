import { Injectable } from "@nestjs/common";
import { Provider } from "src/models/provider.entity";
import { providerRepository } from "src/repository/provider.repository";

@Injectable()
export class providerService {
    constructor(private readonly providerRepository: providerRepository){};

    public getProviderByName(providerName:string):Promise<Provider>{
        return this.providerRepository.getProviderByName(providerName);
    }
}