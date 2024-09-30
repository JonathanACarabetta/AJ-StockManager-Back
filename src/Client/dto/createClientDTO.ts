import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class createClientDTO {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    phone_number: string;

    @IsString()
    @IsOptional()
    address: string;

    @IsString()
    @IsEmail()
    @IsOptional()
    email: string;

    @IsNumber()
    @IsOptional()
    cuit: number;

    @IsOptional()
    @IsString()
    fiscal_key: string;

}