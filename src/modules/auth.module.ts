import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "../controllers";
import { Client } from "../models";
import { ClientRepository } from "../repository";
import { AuthService,ClientService } from "../service";


@Module({
    imports: [TypeOrmModule.forFeature([Client])],
    providers: [{ provide: "IAuthService", useClass: AuthService }, {provide: "IClientService",useClass: ClientService}, ClientRepository],
    controllers: [AuthController],
})
export class AuthModule { };