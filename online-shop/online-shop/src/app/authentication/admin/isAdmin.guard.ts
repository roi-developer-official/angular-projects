import { Injectable } from "@angular/core";
import { CanActivateChild, Router } from "@angular/router";
import { Observable } from "rxjs";
import { isAdminService } from "./isAdmin.service";


@Injectable()
export class isAdminGuard implements CanActivateChild{

    constructor(private authAdminService:isAdminService,private router:Router){}
   
    canActivateChild(): boolean | Observable<boolean> | Promise<boolean> {
        if(this.authAdminService.isAdmin){
            return true;
        } else {
            this.router.navigate(['/home'])
            return false
        }
    }

}

