import {Action} from '@ngrx/store'
import { Order, SendingOrder } from '../order.model';

export const MAKE_ORDER_START = "MAKE_ORDER_START"
export const ORDER_SUCCESS = "ORDER_SUCCESS";
export const ACTION_FAIL = "ACTION_FAIL"
export const CLEAR_ORDER_ID = "CLEAR_ORDER_ID"

export class MakeOrderStart implements Action{
    readonly type = MAKE_ORDER_START;
    constructor(public payload: SendingOrder){}
}

export class OrderSuccess implements Action{
    readonly type = ORDER_SUCCESS;
    constructor(public payload: string){}
}

export class ActionFail implements Action{
    readonly type = ACTION_FAIL;
    constructor(public payload:string){}
}

export class ClearOrderId implements Action{
    readonly type = CLEAR_ORDER_ID;
}
export const GET_ORDERS_START = "GET_ORDERS_START"
export const GET_ORDERS_SUCCESS = "GET_ORDERS_SUCCESS"

export class GetOrdersStart implements Action{
    readonly type = GET_ORDERS_START;
}

export class GetOrderSuccess implements Action{
    readonly type = GET_ORDERS_SUCCESS;
    constructor(public payload: Order[]){}
}
