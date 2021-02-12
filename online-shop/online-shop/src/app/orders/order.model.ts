import { OrderProduct, Product } from "../products/product.model";

export interface Order{
    _id:string;
    products:Product[],
    date:string,
    totalPrice:number;
}


export interface SendingOrder{
    products:OrderProduct[],
    totalPrice:number;
    phone:string,
    address:string
}
