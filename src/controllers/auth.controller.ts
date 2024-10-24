import { Body, Controller, Inject, Post, UseGuards } from "@nestjs/common";
import { AuthInfoDTO } from "../dtos/AuthInfoDTO";
import { createClientDTO } from "../dtos/createClientDTO";
import { LoginDTO } from "../dtos/loginDTO";
import { Client } from "../models/client.entity";
import { IAuthService } from "src/service/interfaces/IAuth.service";
import { Role } from "src/decorators/role.decorator";
import { Roles } from "src/utils/roles.enum";
import { AuthenticationGuard } from "src/guards/authentication.guard";
import { AuthorizationGuard } from "src/guards/authorization.guard";

@Controller("auth")
export class AuthController {
    constructor(@Inject("IAuthService") private readonly authService:IAuthService){}

    @Post("/create_user")
    @Role(Roles.ADMIN)
    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    singUp(@Body()createClient: createClientDTO): Promise<Partial<Client>>{
        return this.authService.singUp(createClient)
    }

    @Post("login")
    singIn(@Body()login:LoginDTO): Promise<AuthInfoDTO>{
        return this.authService.singIn(login.email,login.password)
    }
    
}