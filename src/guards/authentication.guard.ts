import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { config as dotenvConfig } from "dotenv";
import { JwtService } from "@nestjs/jwt";
dotenvConfig({ path: ".env" });

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(" ")[1];
        
        if (!token) throw new UnauthorizedException("Bearer token is required");

        try {
            const secret = process.env.JWT_SECRET;
            const payload = this.jwtService.verify(token,{secret})
            
            payload.exp = new Date(payload.exp * 1000);
            payload.iat = new Date(payload.iat * 1000);
            request.client = payload;
            return true; // Replace with actual authentication logic
        } catch (error) {
            throw new UnauthorizedException("Unauthorized");
        }
    }

}