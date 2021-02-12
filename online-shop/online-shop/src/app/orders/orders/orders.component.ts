import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer'
import { Order } from '../order.model';
import * as ordersActions from '../store/orders.actions'
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{

  orders:Order[];
  dated:string[];
  loading:boolean;
  error:string;
  constructor(private store:Store<fromApp.AppState>) { }


  ngOnInit(): void {
    this.store.dispatch(new ordersActions.GetOrdersStart());
    this.store.select('orders').subscribe(
      (state)=>{
        this.loading = state.loading;
        this.orders = state.orders;
        this.error = state.error;
        console.log(this.orders);
      }
    )
  }

  getDate(order){
    const index = order.date.indexOf('T');
    return order.date.substring(0, index).concat(' ' + order.date.substring(index + 1, index + 6));
  }

  


  

}
