import { Body, Controller, Inject, Post, UseGuards } from "@nestjs/common";
import { AuthInfoDTO, createClientDTO, LoginDTO } from "../dtos";
import { Client } from "../models";
import { IAuthService } from "../service/interfaces";
import { Role } from "../decorators/role.decorator";
import { Roles } from "../utils/roles.enum";
import { AuthenticationGuard } from "../guards";
import { AuthorizationGuard } from "../guards";

@Controller("auth")
export class AuthController {
    constructor(@Inject("IAuthService") private readonly authService:IAuthService){}

    @Post("/create_user")
    //@Role(Roles.USER)
    //@UseGuards(AuthenticationGuard, AuthorizationGuard)
    singUp(@Body()createClient: createClientDTO): Promise<Partial<Client>>{
        return this.authService.singUp(createClient)
    }

    @Post("login")
    singIn(@Body()login:LoginDTO): Promise<AuthInfoDTO>{
        return this.authService.singIn(login.email,login.password)
    }
    
}