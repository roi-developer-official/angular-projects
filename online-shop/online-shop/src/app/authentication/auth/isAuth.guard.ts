import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { isAuthService } from "./isAuth.service";


@Injectable()
export class isAuthGuard implements CanActivate{

    constructor(private isAuthService: isAuthService){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean {
     
        return this.isAuthService.isAuth;
    }

}