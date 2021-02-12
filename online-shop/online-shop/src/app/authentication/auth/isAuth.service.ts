import { Injectable, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromApp from '../../store/app.reducer'
import * as authActions from '../store/auth.actions'

@Injectable()
export class isAuthService implements OnDestroy {
    isAuth:boolean = false;
    timeout;

    constructor(private store:Store<fromApp.AppState>){
        this.store.select('auth').subscribe(
            (state)=>{
                this.isAuth = state.isAuth
            }
        )
    }

    ngOnDestroy(): void {
        clearInterval(this.timeout)
    }

    checkExpiration(expiresIn:number){
        if((new Date().getTime() - expiresIn) > 0){
            return true;
        }
        return false;
    }

    autoLogout(duration){
        this.timeout = setInterval(()=>{
            if(new Date().getTime() > duration){
                this.store.dispatch(new authActions.Logout())
                clearInterval(this.timeout)
                return;
            }
        },1000)
    }

    

}