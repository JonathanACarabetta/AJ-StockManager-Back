import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Client } from "../models/client.entity";
import {ClientService} from "../service/client.service";
import {ClientRepository} from "../repository/client.repository";
import {ClientController} from "../controllers/client.controller";
@Module({
    imports:[TypeOrmModule.forFeature([Client])],
    providers:[ClientService, ClientRepository],
    controllers:[ClientController]
})
export class ClientModule{};