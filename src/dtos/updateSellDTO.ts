import { IsNotEmpty, IsNumber, IsString } from "class-validator";
export class UpdateSellDTO{
    @IsNotEmpty()
    @IsNumber()
    client_id: number;

    @IsNotEmpty()
    @IsString()
    pay_method: string;

    @IsNotEmpty()
    @IsString()
    bill_type: string;
}