import { createClientDTO } from "src/dtos/createClientDTO";
import { Client } from "src/models/client.entity";

export interface IClientService{
    /**
     * @description finds all clients
     * @returns list of clients - Client[]
     */
    getAllClients():Promise<Client[]>

    /**
     * @description finds a client by id
     * @param id - client id - number
     * @returns client - Client
     */
    getClientById(id:number):Promise<Client>

    /**
     * @description creates a new client
     * @param clientDTO - client data - createClientDTO
     * @returns created client - Client
     */
    createClient(clientDTO: createClientDTO):Promise<Client>

    /**
     * @description updates a client by id
     * @param id - client id - number
     * @param clientDTO - client data - createClientDTO
     * @returns updated client - Client
    **/
    updateClient(id:number, clientDTO: createClientDTO):Promise<Client>

    /**
     * @description deletes a client by id
     * @param id - client id - number
     * @returns success message - string
     */
    deleteClient(id:number):Promise<string>
}