import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../product.model';
import * as fromApp from '../../../store/app.reducer'
import * as productsActions from '../../store/products.actions'


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products: Product[];
  error:string;
  loadingArr:boolean[] = [];
  loading:boolean;
  constructor(private store:Store<fromApp.AppState>) {}

  ngOnInit(): void {
   
    this.store.dispatch(new productsActions.GetAdminProdsStart())
    this.store.select('product').subscribe(
      (state)=>{
        this.loading = state.loading;
        this.loadingArr = state.loadingArr;
        if(state.error){
          this.error = state.error;
        } else {
          this.products = state.products;
          
        }
      }
    )
  
  }

  
  deleteProd(id){
    this.store.dispatch(new productsActions.StartDeleteProd(id))
  }

  

}
