import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Roles } from "src/utils/roles.enum";

@Injectable()
export class AuthorizationGuard implements CanActivate{
    constructor(private readonly reflector:Reflector){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(("role"),[
            context.getHandler(),
            context.getClass(),
        ])
        const request = context.switchToHttp().getRequest();
        const client = request.client;

        const hasRole = ()=>requiredRoles.some(role=>client?.role?.includes(role));

        const valid = client && client.role && hasRole();

        if(!valid){
            throw new ForbiddenException('You are not allowed to use this route');
        }
        return valid;
    }
    
}