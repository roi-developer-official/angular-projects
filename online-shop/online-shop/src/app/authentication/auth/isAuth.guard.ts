import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { isAuthService } from "./isAuth.service";


@Injectable()
export class isAuthGuard implements CanActivate{

    constructor(private isAuthService: isAuthService,private router:Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean {
        if(this.isAuthService.isAuth){
            return true;
        }
        this.router.navigate(['/home'])
        return false;
    }

}