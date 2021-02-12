import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as authActions from './auth.actions';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { isAuthService } from '../auth/isAuth.service';


export interface AuthResponseData {
  token: string;
  expiresIn: string;
  admin: boolean;
}

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private isAuthService: isAuthService
  ) {}

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(authActions.SIGNUP_START),
    switchMap((signupActions: authActions.SignupStart) => {
      return this.http
        .post('http://localhost:3000/auth/signup', {
          email: signupActions.payload.email,
          password: signupActions.payload.password,
          name:signupActions.payload.name
        })
        .pipe(
          tap(() => {
            this.router.navigate(['/']);
          }),
          catchError((error:HttpErrorResponse) => {
            return of(new authActions.LoginFail(error.error.message));
          })
        );
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(authActions.LOGIN_START),
    switchMap((loginActions: authActions.LoginStart) => {
      return this.http
        .post('http://localhost:3000/auth/login', {
          email: loginActions.payload.email,
          password: loginActions.payload.password,
        })
        .pipe(
          map((resData: any) => {
            //need's to be stored like this because we need to compare it when we autologin
    
            const expiration = new Date().getTime() + (resData.expiresIn * 1000)
            if(!localStorage.getItem('token')){
                localStorage.setItem('token',JSON.stringify({token: resData.token, expiresIn: expiration}));
            }
            //set time out to the expiration
            this.isAuthService.autoLogout(expiration)
            
            this.router.navigate(['/home']);
            return new authActions.Login({
              isAdmin: resData.admin
            });
          }),
          catchError((error:HttpErrorResponse) => {
            return of(new authActions.LoginFail(error.error.message));
          })
        );
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(authActions.AUTO_LOGIN),
    switchMap((autoLogin: authActions.AutoLogin) => {
      return this.http
        .post('http://localhost:3000/auth/autologin', { body: {} })
        .pipe(
          switchMap((resData: any) => {

            if(resData.state){
              this.router.navigate['/home']
              return of(new authActions.NotLogged()) 
            } else {
              const {expiresIn}  = JSON.parse(localStorage.getItem('token'))
              this.isAuthService.autoLogout(expiresIn)
  
              return of(
                new authActions.Login({
                  isAdmin: resData.isAdmin
                })
              );
            }

          }),
          catchError((err:HttpErrorResponse) => {
            return of(new authActions.LoginFail(err.error.message));
          })
        );
    })
  );
}
