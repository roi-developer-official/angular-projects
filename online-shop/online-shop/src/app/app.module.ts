import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { SubCategoriesComponent } from './header/sub-categories/sub-categories.component';
import { HomeHeaderComponent } from './home/home-header/home-header.component';
import { MainHeaderImageComponent } from './home/home-header/home-images/main-header-image.component';
import { HeaderFavoriteComponent } from './home/home-header/home-favorite/header-favorite.component';
import { HomeMainComponent } from './home/home-main/home-main/home-main.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home/home.component';
import { ProductsComponent } from './products/products/products.component';
import { MenuComponent } from './products/menu/menu.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthComponent } from './authentication/auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { AddProductComponent } from './products/admin/add-product/add-product.component';
import {StoreModule} from '@ngrx/store'
import * as fromApp from './store/app.reducer'
import {EffectsModule} from '@ngrx/effects'
import {AuthEffects} from './authentication/store/auth.effects'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductEffects } from './products/store/products.effects';
import { AdminProductsComponent } from './products/admin/admin-products/admin-products.component';
import { AuthInterceptor } from './auth.interceptor.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { isAdminService } from './authentication/admin/isAdmin.service';
import { isAdminGuard } from './authentication/admin/isAdmin.guard';
import { isAuthService } from './authentication/auth/isAuth.service';
import { isAuthGuard } from './authentication/auth/isAuth.guard';
import { BasketComponent } from './basket/basket.component';
import { BasketService } from './basket/basket.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SubCategoriesComponent,
    HomeHeaderComponent,
    MainHeaderImageComponent,
    HeaderFavoriteComponent,
    HomeMainComponent,
    FooterComponent,
    HomeComponent,
    ProductsComponent,
    MenuComponent,
    CheckoutComponent,
    AuthComponent,
    AddProductComponent,
    AdminProductsComponent,
    PageNotFoundComponent,
    BasketComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects,ProductEffects]),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    isAdminService, isAdminGuard,
    isAuthService, isAuthGuard,
    BasketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
