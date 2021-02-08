import { ActionReducerMap } from '@ngrx/store'
import * as fromAuth from '../authentication/store/auth.reducer'
import * as fromProduct from '../products/store/products.reducer'

export interface AppState{
    auth:fromAuth.State,
    product: fromProduct.State
}

export const appReducer:ActionReducerMap<AppState> = {
    auth : fromAuth.authReducer,
    product: fromProduct.productReducer
}



