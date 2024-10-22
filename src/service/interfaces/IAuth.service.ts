import { createClientDTO } from "src/dtos/createClientDTO";
import { AuthInfoDTO } from "../../dtos/AuthInfoDTO";
import { Client } from "../../models/client.entity";

export interface IAuthService{
    /**
     * @description creates a new User and Hash of credentials
     * @param createClient createClientDTO
     * @returns Promise<Partial<Client>>
     */
    singUp(createClient:createClientDTO): Promise<Partial<Client>>

    /**
     * @description authenticates user and returns JWT token
     * @param email string
     * @param password string
     * @returns Promise<AuthInfoDTO>
     */
    singIn(email:string, password:string): Promise<AuthInfoDTO>
}