import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientController } from "../controllers";
import { ClientRepository } from "../repository";
import { ClientService } from "../service";
import { Client } from "../models";
@Module({
    imports:[TypeOrmModule.forFeature([Client])],
    providers:[{provide:"IClientService",useClass:ClientService,}, ClientRepository],
    controllers:[ClientController]
})
export class ClientModule{};