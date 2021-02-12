import { ActionReducerMap } from '@ngrx/store'
import * as fromAuth from '../authentication/store/auth.reducer'
import * as fromProduct from '../products/store/products.reducer'
import * as fromOrders from '../orders/store/orders.reducer'

export interface AppState{
    auth:fromAuth.State,
    product: fromProduct.State,
    orders:  fromOrders.State
}

export const appReducer:ActionReducerMap<AppState> = {
    auth : fromAuth.authReducer,
    product: fromProduct.productReducer,
    orders: fromOrders.orderReducer
}



