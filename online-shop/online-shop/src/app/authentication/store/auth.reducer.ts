
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
            const {isAdmin} = action.payload;
            return {
                ...state,
                authError:null,
                loading:false,
                isAdmin,
                isAuth: true
            }
        case authActions.LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                user:null,
                isAdmin:false,
                authError:null,
                isAuth:false,
                expiresIn :null
            }
        case authActions.NOT_LOGGED:
            return{
                ...state,
                user:null,
                isAdmin:false,
                isAuth:false,
                authError:null
            }
        default : return state
    }

}
