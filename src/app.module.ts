import { Module } from '@nestjs/common';
import { ProductModule } from './modules/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from "./config/database";
import { CategoryModule } from './modules/category.module';
import {ClientModule} from "./modules/client.module";
import { SellModule } from "./modules/sell.module";
import { Sell_DetailsModule } from './modules/sell_details.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
    load: [typeOrmConfig],
  }),
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => config.get("typeorm"),
  }),
  ProductModule,
  CategoryModule,
  ClientModule,
  SellModule,
  Sell_DetailsModule
],
  providers: [],
})
export class AppModule {}
