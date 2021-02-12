import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAdminGuard } from './authentication/admin/isAdmin.guard';
import { AuthComponent } from './authentication/auth/auth.component';
import { isAuthGuard } from './authentication/auth/isAuth.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { PageGuard } from './header/page.guard';
import { HomeComponent } from './home/home/home.component';
import { OrdersComponent } from './orders/orders/orders.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddProductComponent } from './products/admin/add-product/add-product.component';
import { AdminProductsComponent } from './products/admin/admin-products/admin-products.component';
import { ProductsComponent } from './products/products/products.component';

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'login' , canActivate:[PageGuard], component: AuthComponent},
    {path:'signup', canActivate:[PageGuard], component: AuthComponent},
    {path: 'checkout', component: CheckoutComponent},
    {path: 'orders', canActivate: [isAuthGuard], component:OrdersComponent},
    {path: 'meals', component: ProductsComponent},
    {path: 'admin' ,canActivateChild: [isAdminGuard] ,children: [
      {path: 'add-product', component: AddProductComponent},
      {path: 'products', component: AdminProductsComponent},
      {path: 'edit/:prodId', component: AddProductComponent}
    ]},
    {path: 'not-found', component: PageNotFoundComponent},
    {path: '**', redirectTo: '/not-found'}
  ];
  
  @NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports: [
      RouterModule
    ]
  })
  export class AppRoutingModule {}