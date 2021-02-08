import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Product } from "../products/product.model";

export interface BasketProduct{
    product: Product;
    quantity:number;
  }

@Injectable()
export class BasketService {
    open:boolean = false;
    products:BasketProduct[] = [];
    totalPrice:number = 0;
    statusChanged  = new Subject<boolean>();
    productsChanges = new Subject<{products: BasketProduct[], totalPrice:number}>();
    
    getAllProducts(){
        return this.products.slice()
    }

    getTotalPrice(){
        return this.totalPrice;
    }
    addToBasket(product:Product){

        let quantity = 1;
        let index = this.products.findIndex((prod)=>prod.product._id === product._id);
        if(index >= 0){
            this.products[index].quantity++;
        } else {
            this.products.push({product: product, quantity:quantity});
        }
        this.calcTotalPrice();
        this.productsChanges.next({products: this.products,totalPrice: this.totalPrice});
        this.showBasket();
    }

    calcTotalPrice(){
        this.totalPrice = 0;
        for(let prod of this.products){
          for(let i = 0; i < prod.quantity; i++){
            this.totalPrice += prod.product.price
          }
        }
      }
    removeFromBasket(index){
        this.products.splice(index, 1);
        this.calcTotalPrice()
        this.productsChanges.next({products: this.products,totalPrice: this.totalPrice});

    }
    
    showBasket(){
        this.open = true;
        this.statusChanged.next(true)
    }

    closeBasket(){
        this.statusChanged.next(false)
        this.open = false;
    }

    changeQuantity(value:number,index:number){
        this.products[index].quantity = value;
        this.calcTotalPrice()
        this.productsChanges.next({products: this.products,totalPrice: this.totalPrice});
    }


}
