import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Provider } from "src/models/provider.entity";
import { Raw, Repository } from "typeorm";

@Injectable()
export class providerRepository{
    constructor(@InjectRepository(Provider) private providerRepository: Repository<Provider>){}
    async getProviderByName(providerName:string):Promise<Provider>{
        try{
            const upperSearch = providerName.toUpperCase();
            return await this.providerRepository.findOne({where: {
                name: Raw((alias) => `UPPER(${alias}) LIKE UPPER(:search)`, {
                    search: `%${upperSearch}%`}),
            },relations:["products"]})
        }catch (error) {
            throw new NotFoundException("Error al traer el proveedor");
        }
    }
}