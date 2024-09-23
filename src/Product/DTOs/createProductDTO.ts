import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDTO{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    cost: number;
    
    @IsNotEmpty()
    @IsNumber()
    price: number;
    
    @IsNotEmpty()
    @IsNumber()
    stock: number;
    

    @IsNumber()
    bar_code: number;

    @IsNotEmpty()
    @IsString()
    brand: string;

    @IsArray()
    categories: number[];

    @IsNotEmpty()
    @IsString()
    provider_name: string;
}