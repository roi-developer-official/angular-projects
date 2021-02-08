import { retry } from 'rxjs/operators'
import { User } from '../user.model'
import * as authActions from './auth.actions'

export interface State{
    user:User,
    authError:string,
    loading:boolean,
    isAdmin: boolean,
    isAuth:boolean,
    expiresIn:string
}

const initialState :State = {
    user:null,
    authError: null,
    loading:false,
    isAdmin: false,
    isAuth : false,
    expiresIn: null
}

export function authReducer(state = initialState, action:any){

    switch(action.type){
        case authActions.LOGIN_START:
        case authActions.SIGNUP_START:
            return {
                ...state,
                loading:true,
                authError:null
            }
        case authActions.LOGIN_FAIL:
            return {
                ...state,
                user:null,
                authError: action.payload,
                loading:false
            }
        case authActions.LOGIN:
            const {email, token, isAdmin} = action.payload;
            const user = new User(email,token);
            return {
                ...state,
                authError:null,
                user : user,
                loading:false,
                isAdmin,
                isAuth: token
            }
        case authActions.LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                user:null,
                isAdmin:false,
                authError:null,
                isAuth:false
            }
        default : return state
    }

}
