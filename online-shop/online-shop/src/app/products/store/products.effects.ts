import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Product } from '../product.model';
import * as productActions from './products.actions';

export interface ProductResult {
  product: Product;
  message: string;
}

@Injectable()
export class ProductEffects {
  constructor(
    private http: HttpClient,
    private actions$: Actions
  ) {}

  @Effect()
  getAllProds = this.actions$.pipe(ofType(productActions.GET_ALL_PRODS_START),
  switchMap((getAllProdsStart:productActions.GetAllProdsStart)=>{
    return this.http.get('http://localhost:3000/products/allproducts')
    .pipe(
      switchMap((resData:Product[])=>of(new productActions.GetAllProdsSuccess(resData)))
      ,catchError((err)=> of(new productActions.ActionFail(err.error.message)))
  )}))

  @Effect()
  getAdProds = this.actions$.pipe(
    ofType(productActions.GET_ADMIN_PRODS_START),
    switchMap((getAdminProds: productActions.GetAdminProdsStart) => {
      return this.http.get('http://localhost:3000/products/admin-products');
    }),
    switchMap((result: Product[]) => {
      return of(new productActions.GetAdminProdsSuccess(result));
    }),
    catchError((error) => {
      return of(new productActions.ActionFail(error.error.message));
    })
  );

  @Effect()
  addProducts = this.actions$.pipe(
    ofType(productActions.ADD_PROD_START),
    switchMap((addProductActions: productActions.AddProdStart) => {
      return this.http
        .post(
          'http://localhost:3000/products/add-product',
          addProductActions.payload
        )
        .pipe(
          switchMap(({ product: result }: ProductResult) => {
            const product: Product = {
              title: result.title,
              name:result.name,
              description: result.description,
              imageUrl: result.imageUrl,
              price: result.price,
              ingredients: result.ingredients,
              categories: result.categories,
              homeProd: result.homeProd,
            };
            return of(new productActions.AddProdSuccess(product));
          }),
          catchError((error) => {
            return of(new productActions.ActionFail(error.error.message));
          })
        );
    })
  );

  @Effect()
  editProduct = this.actions$.pipe(
    ofType(productActions.EDIT_PROD_START),
    switchMap((editProduct: productActions.EditProdStart) =>
      this.http
        .post(
          'http://localhost:3000/products/edit-product',
          editProduct.payload
        )
        .pipe(
          switchMap((resData:Product) => {
            return of(new productActions.EditProdSuccess(resData));
          }),
          catchError((err) => {
            return of(new productActions.ActionFail(err.error.message));
          })
        )
    )
  );

  @Effect()
  startDeleteProd = this.actions$.pipe(
    ofType(productActions.START_DELETE_PROD),
    switchMap((deleteProd: productActions.StartDeleteProd) => {
      return this.http
        .delete('http://localhost:3000/products/delete-product/' + deleteProd.payload)
        .pipe(
          switchMap(() => {
            return of(new productActions.DeleteSuccess(deleteProd.payload));
          }),
          catchError((err) => {
            return of(new productActions.ActionFail(err.error.message));
          })
        );
    })
  );


}
