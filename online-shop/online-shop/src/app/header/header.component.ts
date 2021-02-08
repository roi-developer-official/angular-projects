import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as authActions from '../authentication/store/auth.actions'
import { BasketService } from '../basket/basket.service';
import * as prouctsActions from '../products/store/products.actions'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  isAdmin:boolean = false;
  showProdCtgs: boolean = false;
  categories;

  constructor(private store: Store<fromApp.AppState>,
    private basketService:BasketService
  ) {}

  onMouseOut(event) {
    let toElement;
    if (event.toElement) {
      toElement = event.toElement.className.split(' ')[0];
      if(toElement === 'nav-item'){
        return;
      }
      if (
        toElement !== 'products_categories' &&
        toElement !== 'category_link'
      ) {
        this.showProdCtgs = false;
      }
    } else {
      this.showProdCtgs = false;
    }
  }
  logout() {
    this.store.dispatch(new authActions.Logout())
  }

  ngOnInit(): void {
    this.store.dispatch(new prouctsActions.GetCategories())
    this.store.select('product').subscribe(
      (state)=>{
        this.categories = state.categories
      }
    )
    this.store.dispatch(new authActions.AutoLogin())
    this.store.select('auth').subscribe(
      (state) => {
        this.isAdmin = state.isAdmin;
        this.isAuthenticated = state.isAuth 
      });
    }

    openBasket(){
      this.basketService.showBasket();
    }

    showCat(){
      this.showProdCtgs = !this.isAdmin;
      this.basketService.closeBasket();
    
    }
    
    
    


}
