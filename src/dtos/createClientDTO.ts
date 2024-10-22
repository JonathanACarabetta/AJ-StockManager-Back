import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

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

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(15)
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/, { message: 'La contraseña es muy debil' })
    password: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(15)
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/, { message: 'La contraseña es muy debil' })
    repeat_password: string;

    @IsNumber()
    @IsOptional()
    cuit: number;

    @IsOptional()
    @IsString()
    fiscal_key: string;

}