import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { isAuthService } from "../authentication/auth/isAuth.service";



@Injectable()
export class PageGuard implements CanActivate{

    constructor(private isAuthService:isAuthService, private router:Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(this.isAuthService.isAuth){
            this.router.navigate(['/home']);
            return false;
        }
        return true;
    }

}