import { IsNotEmpty, IsNumber } from "class-validator";

export class EditPriceCost{

    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsNumber()
    cost: number;
    
    @IsNotEmpty()
    @IsNumber()
    price: number;
}