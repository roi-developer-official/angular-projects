import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as authActions from '../authentication/store/auth.actions'
import { BasketService } from '../basket/basket.service';
import * as prouctsActions from '../products/store/products.actions'
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  isAdmin:boolean = false;
  showProdCtgs: boolean = false;
  mobileReverseCats:any[] = [];
  mobileShowProds:boolean = false;
  showMoblieMenu:boolean = false;
  mobileShowSubCat:boolean[] = [];
  categories:any[] = [];
  windowSub;



  constructor(private store: Store<fromApp.AppState>,
    private basketService:BasketService
  ) {}

  ngOnInit(): void {
   this.windowSub = fromEvent(window, 'resize').subscribe(
      (window:any)=>{
        if(window.currentTarget.innerWidth > 600 && this.showMoblieMenu)
          this.showMoblieMenu = false;
      })

    this.store.dispatch(new prouctsActions.GetCategories())
    this.store.select('product').subscribe(
      (state)=>{
        this.categories = state.categories
        this.mobileReverseCats = this.categories.slice().reverse()
      }
    )
    this.store.dispatch(new authActions.AutoLogin())
    this.store.select('auth').subscribe(
      (state) => {
        this.isAdmin = state.isAdmin;
        this.isAuthenticated = state.isAuth 
      });
    }

  ngOnDestroy(): void {
    this.windowSub.unsubsribe();
  }

  mobileShowSubCatHandler(index:number){
    if(this.mobileShowSubCat[index]){
      this.mobileShowSubCat[index] = false;
    } else {
      this.mobileShowSubCat[index] = true;
    }
  }

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

    openBasket(){
      this.basketService.showBasket();
      this.showMoblieMenu = false;
    }

    showCat(){
      this.showProdCtgs = !this.isAdmin;
      this.basketService.closeBasket();
    }
    
    showMenu(){
      this.showMoblieMenu = !this.showMoblieMenu;
      this.basketService.closeBasket();
    }
    
    


}
