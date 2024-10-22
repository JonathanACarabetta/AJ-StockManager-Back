import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AuthInfoDTO {
    @IsNotEmpty()
    @IsNumber()
    client_id: number;

    @IsNotEmpty()
    @IsEmail()
    client_email: string;

    @IsNotEmpty()
    @IsString()
    token: string;
}