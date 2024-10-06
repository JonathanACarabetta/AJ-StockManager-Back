import { Module } from '@nestjs/common';
import { ProductModule } from './Product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from "./config/database";
import { CategoryModule } from './Category/category.module';
import {ClientModule} from "./Client/client.module";
import { SellModule } from "./Sell/sell.module";
import { Sell_DetailsModule } from './Sell_Details/sell_details.module';

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
