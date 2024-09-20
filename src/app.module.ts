import { Module } from '@nestjs/common';
import { ProductModule } from './Product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from "./config/database";
import { CategoryModule } from './Category/Category.module';

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
],
  providers: [],
})
export class AppModule {}
