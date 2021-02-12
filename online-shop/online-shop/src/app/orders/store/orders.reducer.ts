import * as ordersActions from './orders.actions'
import { Order } from "../order.model";


export interface State {
    orders:Order[];
    loading:boolean;
    error:string;
    orderId:string
}

const initialState = {
    order:null,
    orders:[],
    loading:false,
    error:null,
    orderId:null
}

export function orderReducer(state = initialState, action:any){

    switch(action.type){
        case ordersActions.MAKE_ORDER_START:
        case ordersActions.GET_ORDERS_START:
            return {
                ...state,
                loading:true,
                error:null,
                orderId:null
            }
        case ordersActions.ORDER_SUCCESS:
            return {
                ...state,
                loading:false,
                error:null,
                orderId: action.payload
            }
        case ordersActions.GET_ORDERS_SUCCESS:
            return {
                ...state,
                loading:false,
                error:null,
                orders: [...action.payload]
            }
        case ordersActions.CLEAR_ORDER_ID:
            return {
                ...state,
                orderId:null
            }
        case ordersActions.ACTION_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload,
                orderSuccess:false,
                orderId:null
            }
    
        default : return state;
    }




} 