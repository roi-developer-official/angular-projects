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

  constructor(private store:Store<fromApp.AppState>) {}

  ngOnInit(): void {
   
    this.store.dispatch(new productsActions.GetAdminProds())
    this.store.select('product').subscribe(
      (state)=>{
        if(state.error){
          this.error = state.error;
        } else {
          this.products = state.products
        }
      }
    )
    if(this.products.length === 0)
      this.store.dispatch(new productsActions.GetAdminProdsStart())
  }

  
  deleteProd(id){
    this.store.dispatch(new productsActions.StartDeleteProd(id))
  }

  

}
