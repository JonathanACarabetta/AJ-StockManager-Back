import { Body, Controller, Inject, Post } from "@nestjs/common";
import { AuthInfoDTO } from "../dtos/AuthInfoDTO";
import { createClientDTO } from "../dtos/createClientDTO";
import { LoginDTO } from "../dtos/loginDTO";
import { Client } from "../models/client.entity";
import { IAuthService } from "src/service/interfaces/IAuth.service";

@Controller("auth")
export class AuthController {
    constructor(@Inject("IAuthService") private readonly authService:IAuthService){}

    @Post("/create")
    singUp(@Body()createClient: createClientDTO): Promise<Partial<Client>>{
        return this.authService.singUp(createClient)
    }

    @Post("login")
    singIn(@Body()login:LoginDTO): Promise<AuthInfoDTO>{
        return this.authService.singIn(login.email,login.password)
    }
    
}