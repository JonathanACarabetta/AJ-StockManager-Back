import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProviderController } from "../controllers";
import { Provider } from "../models";
import { ProviderRepository } from "../repository";
import { ProviderService } from "../service";

@Module({
    imports:[TypeOrmModule.forFeature([Provider])],
    providers:[ProviderRepository, {provide:"IProviderService",useClass:ProviderService,}],
    controllers:[ProviderController]
})
export class ProviderModule{};