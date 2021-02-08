import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { isAuthService } from '../authentication/auth/isAuth.service';
import { BasketProduct, BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  products:BasketProduct[] = [];
  totalPrice:number;
  detailsForm:FormGroup;
  constructor(private basketService:BasketService,private isAuthService:isAuthService,
    private router:Router) {}

  ngOnInit(): void {
    this.detailsForm = new FormGroup({
      name: new FormControl(null),
      phone: new FormControl(null),
      address: new FormControl(null)
    })
    this.products = this.basketService.getAllProducts();
    this.totalPrice = this.basketService.getTotalPrice();
  }

  onSubmit(){
    if(!this.isAuthService.isAuth){
      return this.router.navigate(['/signup'])
    }
    const {name, phone,address} = this.detailsForm.controls;

  }



}
