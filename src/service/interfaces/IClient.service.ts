import { createClientDTO } from "../../dtos/createClientDTO";
import { Client } from "../../models/client.entity";

export interface IClientService{
    /**
     * @description finds all clients
     * @returns list of clients - Promise<Client[]>
     */
    getAllClients():Promise<Client[]>

    /**
     * @description finds a client by id
     * @param id - client id - number
     * @returns client - Promise<Client>
     */
    getClientById(id:number):Promise<Client>

    /**
     * @description finds a client by email
     * @param email string
     * @returns :Promise<Client>
     */
    getClientByEmail(email:string):Promise<Client>

    /**
     * @description creates a new client
     * @param clientDTO - client data - createClientDTO
     * @returns created client - Promise<Client>
     */
    createClient(clientDTO: createClientDTO):Promise<Client>

    /**
     * @description updates a client by id
     * @param id - client id - number
     * @param clientDTO - client data - createClientDTO
     * @returns updated client - Promise<Client>
    **/
    updateClient(id:number, clientDTO: createClientDTO):Promise<Client>

    /**
     * @description deletes a client by id
     * @param id - client id - number
     * @returns success message - Promise<string>
     */
    deleteClient(id:number):Promise<string>
}