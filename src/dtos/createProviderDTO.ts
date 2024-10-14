import { IsNotEmpty, IsString } from "class-validator";

export class createProviderDTO{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    address: string;
}