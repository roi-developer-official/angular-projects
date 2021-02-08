import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { Product } from 'src/app/products/product.model';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css'],
})
export class HomeHeaderComponent implements OnInit {
  
  products:Product[] = []
  selectedProduct:Product;
  constructor(private homeService:HomeService,
    private basketService:BasketService) { }

  ngOnInit(): void {
    this.homeService.productsChange.subscribe(
      ()=>{
        this.products =this.homeService.getHeaderProducts()
    })
  }
  onSelectedProduct(id:string){
    this.selectedProduct = this.homeService.getAllProds().find(prod=>prod._id === id);
  }

  addToBasket(){
    this.basketService.addToBasket(this.selectedProduct)

  }
}
