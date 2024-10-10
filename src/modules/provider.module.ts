import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Provider } from "../models/provider.entity";
import { ProviderRepository } from "../repository/Provider.repository";
import { ProviderService } from "../service/Provider.service";
import { ProviderController } from "src/controllers/provider.controller";

@Module({
    imports:[TypeOrmModule.forFeature([Provider])],
    providers:[ProviderRepository, ProviderService],
    controllers:[ProviderController]
})
export class ProviderModule{};