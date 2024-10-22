import { Global, Module } from '@nestjs/common';
import { ProductModule } from './modules/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from "./config/database";
import { CategoryModule } from './modules/category.module';
import {ClientModule} from "./modules/client.module";
import { SellModule } from "./modules/sell.module";
import { Sell_DetailsModule } from './modules/sell_details.module';
import { ProviderModule } from './modules/provider.module';
import { AuthModule } from './modules/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { config as dotenvConfig } from "dotenv";

dotenvConfig({ path: ".env" });
@Global()
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
  Sell_DetailsModule,
  ProviderModule,
  AuthModule,
  JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: "1h",
    },
  })
],
  providers: [],
})
export class AppModule {}
