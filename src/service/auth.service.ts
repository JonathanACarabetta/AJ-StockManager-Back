import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { IAuthService, IClientService } from "./interfaces";
import { AuthInfoDTO, createClientDTO } from "../dtos";
import { hash, compare } from "bcrypt";
import { Client } from "../models";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService implements IAuthService{
    constructor(
      @Inject("IClientService") private readonly clientService: IClientService,
      private readonly jwtService: JwtService,
    ){}

    async singUp(createClient: createClientDTO): Promise<Partial<Client>> {
        try {
            const findClient = await this.clientService.getClientByEmail(createClient.email);
            if(findClient) throw new BadRequestException("The email already exists!")
            if(createClient.password!=createClient.repeat_password)throw new BadRequestException("Passwords doesn't match!")
            const hashedPassword = await hash(createClient.password,10);
            if(!hashedPassword) throw new BadRequestException("Password can't be hashed")
            createClient.password = hashedPassword;
            const client = await this.clientService.createClient(createClient);
            const {password,id,...clientNoPassword}=client;
            return clientNoPassword;
        } catch (error) {
            throw error;
        }
    }

    async singIn(email: string, password: string): Promise<AuthInfoDTO> {
        try {
            const client = await this.clientService.getClientByEmail(email);
            if(!client) throw new BadRequestException("User don't exists!")
            const isPasswordValid = await compare(password,client.password);
            if(!isPasswordValid)throw new BadRequestException("Email and Password don't match")
            const clientPayload={
                id:client.id,
                email:client.email,
                role: client.role
            }
            const jwtToken = this.jwtService.sign(clientPayload);
            const authInfo : AuthInfoDTO ={
                token: jwtToken,
                client_email: client.email,
                client_id: client.id,
                role: client.role,
            }
            return authInfo;
        } catch (error) {
            throw error;
        }
    }
    
}