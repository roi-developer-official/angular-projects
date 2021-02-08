import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/products/product.model';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products:Product[] = []
  error:string
  headerProds:Product[] = []
  mainProds:Product[] =[]

  constructor(private homeService:HomeService){}
  ngOnInit(): void {
    this.homeService.getProducts().subscribe()
  }

}
