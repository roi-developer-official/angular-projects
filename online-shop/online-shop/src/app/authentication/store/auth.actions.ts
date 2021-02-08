import { Action } from '@ngrx/store'

export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const AUTO_LOGIN = "AUTO_LOGIN";
export const LOGIN_START ="LOGIN_START"
export const LOGIN_FAIL ="LOGIN_FAIL"
export const SIGNUP_START ="SIGNUP_START"
export const SIGNUP ="SIGNUP"
export const HANDLE_ERROR = "HANDLE_ERROR"

export class Login implements Action{
    readonly type = LOGIN;
    constructor(public payload: {email:string,token:string,isAdmin:boolean}){}
}

export class Logout implements Action{
    readonly type = LOGOUT;
}

export class SignupStart implements Action {
    readonly type = SIGNUP_START;
    constructor(public payload:{ email:string, password:string}){}
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;
    constructor(public payload:{ email:string, password:string}){}
}

export class LoginFail implements Action{
    readonly type = LOGIN_FAIL
    constructor (public payload:string){}
}

export class AutoLogin implements Action{
    readonly type = AUTO_LOGIN;
}





