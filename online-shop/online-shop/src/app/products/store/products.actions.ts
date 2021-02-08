import { Action } from '@ngrx/store'
import { Product } from '../product.model';

export const ADD_PROD_START = "ADD_PROD_START";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const ADD_PROD_SUCCESS= "ADD_PROD_SUCCESS";
export const GET_ALL_PRODS_START = "GET_ALL_PRODS_START";
export const GET_ALL_PRODS_SUCCESS = "GET_ALL_PRODS_SUCCESS";
export const ACTION_FAIL = "ACTION_FAIL";
export const GET_ALL_PRODS = "GET_ALL_PRODS"

export class GetAllProds implements Action{
    readonly type = GET_ALL_PRODS;
}

export class GetAllProdsStart implements Action{
    readonly type = GET_ALL_PRODS_START;
}

export class GetCategories implements Action{
    readonly type = GET_CATEGORIES;
}

export class GetAllProdsSuccess implements Action{
    readonly type = GET_ALL_PRODS_SUCCESS;
    constructor(public payload:Product[]){}
}

export class AddProdStart implements Action{
    readonly type = ADD_PROD_START;
    constructor(public payload: FormData){}
}

export class AddProdSuccess implements Action {
    readonly type = ADD_PROD_SUCCESS
    constructor(public payload: Product){}
}

export class ActionFail implements Action{
    readonly type = ACTION_FAIL;
    constructor(public payload: string){}
}

export const GET_ADMIN_PRODS_START = "GET_ADMIN_PRODS_START"
export const GET_ADMIN_PRODS = "GET_ADMIN_PRODS";
export const GET_ADMIN_PRODS_SUCCESS = "GET_ADMIN_PRODS_SUCCESS";
export const GET_SINGLE_PROD_START = "GET_SINGLE_PROD_START"
export const GET_SINGLE_PROD_SUCCESS = "GET_SINGLE_PROD_SUCCESS"
export const EDIT_PROD_START = "EDIT_PROD_START"
export const EDIT_PROD_SUCEESS = "EDIT_PROD_SUCCESS"
export const START_DELETE_PROD = "START_DELETE_PROD"
export const DELETE_SUCCESS = "DELETE_SUCCESS"

export class StartDeleteProd implements Action{
    readonly type = START_DELETE_PROD;
    constructor(public payload: string){}
}

export class GetAdminProds implements Action{
    readonly type = GET_ADMIN_PRODS;

}
export class DeleteSuccess implements Action{
    readonly type = DELETE_SUCCESS;
    constructor(public payload: string){}
}

export class GetAdminProdsStart implements Action{
    readonly type = GET_ADMIN_PRODS_START;
}

export class GetAdminProdsSuccess implements Action{
    readonly type = GET_ADMIN_PRODS_SUCCESS;
    constructor(public payload: Product[]){}
}

export class GetSingleProdStart implements Action{
    readonly type = GET_SINGLE_PROD_START;
    constructor(public payload: string){}
}

export class GetSingleProdSuccess implements Action{
    readonly type = GET_SINGLE_PROD_SUCCESS;
    constructor(private payload: Product){}
}

export class EditProdStart implements Action{
    readonly type = EDIT_PROD_START;
    constructor(public payload: FormData){}
}

export class EditProdSuccess implements Action{
    readonly type = EDIT_PROD_SUCEESS;
    constructor(public payload: Product){}
}