import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sell } from "./sell.entity";
import { SellRepository } from "./sell.repository";
import { SellService } from "./sell.service";
import { SellController} from "./sell.controller";

@Module({
    imports:[TypeOrmModule.forFeature([Sell])],
    providers:[SellRepository, SellService],
    controllers:[SellController]
})
export class SellModule{};