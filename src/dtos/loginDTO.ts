import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class LoginDTO {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(15)
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/, { message: 'La contraseña es muy debil' })
    password: string;
}