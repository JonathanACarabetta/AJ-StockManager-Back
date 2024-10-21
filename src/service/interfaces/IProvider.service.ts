import { createProviderDTO } from "src/dtos/createProviderDTO";
import { Provider } from "src/models/provider.entity";

export interface IProviderService{
    /**
     * @description finds a Provider by name
     * @param providerName string
     * @returns Provider
     */
    getProviderByName(providerName:string):Promise<Provider>

    /**
     * @description finds all Providers
     * @returns Provider[]
     */
    getProviders():Promise<Provider[]>

    /**
     * @description finds a Provider by Id
     * @param id number
     * @returns Provider
     */
    getProviderById(id: number):Promise<Provider>

    /**
     * @description finds all Providers using the entry Array of ids
     * @param ids Number[]
     * @returns Provider[]
     */
    getProvidersByIds (ids: number[]):Promise<Provider[]>
    
    /**
     * @description creates a Provider
     * @param provider createProviderDTO 
     * @returns Provider
     */
    createProvider(provider: createProviderDTO):Promise<Provider>
    
    /**
     * @description finds a existing provider and updates
     * @param id number
     * @param providerDTO createProviderDTO 
     * @returns Provider
     */
    updateProvider(id:number, providerDTO: createProviderDTO):Promise<Provider>
    
    /**
     * @description deletes a Provider by id
     * @param id number
     * @returns string
     */
    deleteProvider(id: number):Promise<string>
}