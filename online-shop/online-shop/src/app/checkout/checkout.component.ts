import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { isAuthService } from '../authentication/auth/isAuth.service';
import { BasketProduct, BasketService } from '../basket/basket.service';
import {  SendingOrder } from '../orders/order.model';
import * as fromApp from '../store/app.reducer'
import * as ordersActions from '../orders/store/orders.actions'
import { OrderProduct } from '../products/product.model';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  products:BasketProduct[] = [];
  totalPrice:number;
  detailsForm:FormGroup;
  error:string;
  loading:boolean;
  orderId:string;
  subscription;
  phoneError:string;
  addressError:string;
  constructor(private basketService:BasketService,private isAuthService:isAuthService,
    private router:Router, private store:Store<fromApp.AppState>) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ordersActions.ClearOrderId())
  }

  ngOnInit(): void {
    this.subscription = this.store.select('orders').subscribe(
      (state)=>{
        this.loading = state.loading;
        if(state.error){
          this.error = state.error
        }
        if(state.orderId){
          this.orderId = state.orderId;
          this.basketService.clearBasket();
        }

      }
    )
    this.detailsForm = new FormGroup({
      phone: new FormControl(null, [Validators.required , Validators.minLength(9)]),
      address: new FormControl(null, [Validators.required, Validators.minLength(5)])
    })
    this.products = this.basketService.getAllProducts();
    this.totalPrice = this.basketService.getTotalPrice();
    if(this.products.length === 0){
      this.router.navigate(['/home'])
    }
  }


  onSubmit(){
    if(!this.isAuthService.isAuth){
      return this.router.navigate(['/signup'])
    }
    const {phone,address} = this.detailsForm.controls;

    
    if(this.validateInputs(phone,address)){
      let products:OrderProduct[] = [];
      for(let prod of this.products){
        products.push({
          _id: prod._id,
          quantity: prod.quantity
        })
      } 
  
      
      const order:SendingOrder = {
        phone:phone.value.toString(),
        address: address.value,
        products: products,
        totalPrice: Number.parseFloat(this.totalPrice.toFixed(2))
      }
      
      this.store.dispatch(new ordersActions.MakeOrderStart(order));
    }
  
  }
  

  validateInputs(phone,address){
    let isValid = true;
    if(!phone.valid){
      isValid = false;
      if(phone.errors.required){
        this.phoneError = 'שדה זה הינו שדה חובה'
      } else {
        this.phoneError = 'מספר פלאפון לא תקין'
      }
    }
    if(!address.valid){
      isValid = false;
      if(address.errors.required){
        this.addressError = 'שדה זה הינו שדה חובה'
      } else {
        this.addressError = 'כתובת לא תקינה'
      }

    }
    return isValid
  }




}
