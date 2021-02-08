import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { Product } from 'src/app/products/product.model';
import { HomeService } from '../../home.service';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css']
})
export class HomeMainComponent implements OnInit {
  isHovered:boolean = false;
  products:Product[]
  show:boolean[] =[];
  placeHolderIndex;
  constructor(private homeService:HomeService,private basketService:BasketService) { }

  ngOnInit(): void {
    this.homeService.productsChange.subscribe(()=>{
    this.products = this.homeService.getMainProducts();
    }
    )
  }
  displayDetails(index:number){
    this.show = [];
    let prodIndex =  this.products.filter(prod=>prod).findIndex(prod=>prod === this.products[index])
    this.products = this.products.filter(prod=>prod)
    this.products.splice(prodIndex, 0 ,null)
    this.show[prodIndex + 1] = true;
  }


  hideDetails(){
    this.show = [];
    this.products = this.products.filter(prod=>prod)
  }


  addToBasket(index:number){
    const product = this.products[index]
    this.basketService.addToBasket(product)
    this.hideDetails();
  }

}
