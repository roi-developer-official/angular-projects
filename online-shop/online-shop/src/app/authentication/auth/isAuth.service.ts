import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromApp from '../../store/app.reducer'

@Injectable()
export class isAuthService {
    isAuth:boolean = false;

    constructor(private store:Store<fromApp.AppState>){
        this.store.select('auth').subscribe(
            (state)=>{
                this.isAuth = state.isAuth
            }
        )
    }

}