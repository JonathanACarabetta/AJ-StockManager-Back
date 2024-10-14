import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { EditPriceCost } from "../dtos/editPriceCost";

@Injectable()
export class updateProductPriceAndCostInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const products = request.body;
        const filteredProducts: EditPriceCost[] = products.map(product =>{
            const price = product.price ? parseFloat(product.price):null;
            const cost = product.cost ? parseFloat(product.cost):null;
            const editProduct :EditPriceCost= {
                id: product.id,
                price: price,
                cost: cost
            };
            return editProduct;
        })
        request.body = filteredProducts;
        return next.handle();
    }
}