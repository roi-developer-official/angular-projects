import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/products/product.model';
import { HomeService } from '../../home.service';

@Component({
  selector: 'app-header-favorite',
  templateUrl: './header-favorite.component.html',
  styleUrls: ['./header-favorite.component.css']
})
export class HeaderFavoriteComponent implements OnInit {

  product:Product;
  @Output() productSelected = new EventEmitter<string>()
  constructor(private homeService:HomeService) { }

  ngOnInit(): void {
    this.homeService.productsChange.subscribe(()=>{
      this.product = this.homeService.getFavoriteProd()
    })
  }

  onSelectedProduct(id:string){
    this.productSelected.emit(id)
  }
  
}
