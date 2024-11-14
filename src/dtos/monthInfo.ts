import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Product } from "../models/product.entity";

export class MonthInfo{
    @IsNumber()
    @IsNotEmpty()
    total:number;

    @IsNotEmpty()
    most_Selled_product:Product;

    @IsString()
    @IsNotEmpty()
    period:Period;
}

class Period {
    @IsNumber()
    @IsNotEmpty()
    month:number;
    @IsNumber()
    @IsNotEmpty()
    year:number
}