import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as authActions from './auth.actions';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';


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
    private router: Router
  ) {}

  @Effect({ dispatch: false })
  authSignup = this.actions$.pipe(
    ofType(authActions.SIGNUP_START),
    switchMap((signupActions: authActions.SignupStart) => {
      return this.http
        .post('http://localhost:3000/auth/signup', {
          email: signupActions.payload.email,
          password: signupActions.payload.password,
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
            localStorage.setItem('token', resData.token);
            this.router.navigate(['/']);
            return new authActions.Login({
              email: loginActions.payload.email,
              token: resData.token,
              isAdmin: resData.admin,
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
        .post('http://localhost:3000/auth/isadmin', { body: {} })
        .pipe(
          switchMap((resData: any) => {
            //check if the expiration data is legit
            const token = localStorage.getItem('token');
            return of(
              new authActions.Login({
                email: resData.email,
                token,
                isAdmin: resData.isAdmin,
              })
            );
          }),
          catchError((err:HttpErrorResponse) => {
            return of(new authActions.LoginFail(err.error.message));
          })
        );
    })
  );
}
