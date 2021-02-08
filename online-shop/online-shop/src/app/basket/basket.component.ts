import { AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { BasketProduct, BasketService } from './basket.service';



@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit{
  isOpen:boolean = false;
  height;
  products:BasketProduct[] = [];
  totalPrice: number = 0;
  constructor(private basketService:BasketService,private router:Router) { }

  ngOnInit(): void {
    this.height = window.innerHeight
    this.basketService.statusChanged.subscribe(
      (status)=>{
        this.isOpen = status
      }
    )
    this.basketService.productsChanges.subscribe(
      (state)=>{
        this.products = state.products;
        this.totalPrice = state.totalPrice;
      }
    )
  }

  changeQuantity(value:number, index:number){
    this.basketService.changeQuantity(value, index)
  }

  removeProduct(index:number){
    this.basketService.removeFromBasket(index)
  }

  closeBasket(){
    this.basketService.closeBasket();
  }
  moveToCheckout(){
    this.basketService.closeBasket();
    setTimeout(()=>{
      this.router.navigate(['/checkout']);
    },100)
  }

  

}
