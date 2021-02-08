import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromApp from '../../store/app.reducer'

@Injectable()
export class isAdminService  {
    isAdmin:boolean = false;
    isAuth:boolean = false;

    constructor(private store:Store<fromApp.AppState>){
        this.store.select('auth').subscribe(
            (state)=>{
                this.isAdmin = state.isAdmin;
            }
        )
    }

}