import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "src/controllers/auth.controller";
import { Client } from "src/models/client.entity";
import { ClientRepository } from "src/repository/client.repository";
import { AuthService } from "src/service/auth.service";
import { ClientService } from "src/service/client.service";

@Module({
    imports: [TypeOrmModule.forFeature([Client])],
    providers: [{ provide: "IAuthService", useClass: AuthService }, {provide: "IClientService",useClass: ClientService}, ClientRepository],
    controllers: [AuthController],
})
export class AuthModule { };