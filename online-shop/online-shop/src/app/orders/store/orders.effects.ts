import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Product } from 'src/app/products/product.model';
import { Order } from '../order.model';
import * as ordersActions from './orders.actions';


export interface OrdersResponse{
  orderId:string;
  totalPrice:string,
  products:Product[]
}

@Injectable()
export class OrdersEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  @Effect()
  makeOrder = this.actions$.pipe(
    ofType(ordersActions.MAKE_ORDER_START),
    switchMap((makeOrder: ordersActions.MakeOrderStart) => {
      const {phone, address, products, totalPrice} = makeOrder.payload
      return this.http
        .post('http://localhost:3000/orders/make', {
          phone,
          address,
          products,
          totalPrice
        })
        .pipe(
          switchMap((resData: any) => {
            return of(new ordersActions.OrderSuccess(resData.orderId));
          }),
          catchError((err) => {
            return of(new ordersActions.ActionFail(err.error.message));
          })
        );
    })
  );

  @Effect()
  getOrders = this.actions$.pipe(
    ofType(ordersActions.GET_ORDERS_START),
    switchMap(() => {
      return this.http.get('http://localhost:3000/orders/getorders').pipe(
        switchMap((resData: Order[]) => {
          return of(new ordersActions.GetOrderSuccess(resData))
        }),
        catchError((err) => {
            return of(new ordersActions.ActionFail(err.error.message))
        })
      );
    })
  );
}
