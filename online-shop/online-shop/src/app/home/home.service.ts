import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, EventEmitter } from "@angular/core";
import { map, catchError } from "rxjs/operators";
import { Product } from "../products/product.model";


@Injectable({providedIn:'root'})
export class HomeService{
    products:Product[] = []
    productsChange = new EventEmitter<Product[]>()
    error:string;
    index:number;
    constructor(private http:HttpClient){}

    getProducts(){
        const time = new Date().getDate()
        this.index = Math.floor(time % 8);
        return this.http.get('http://localhost:3000/products/home')
        .pipe(
          map((resData:Product[])=>{
              this.products = resData
              if((resData.length - 1) < this.index){
                  this.index = resData.length - 1;
              }
              this.productsChange.emit()
          })
          ,catchError((err:HttpErrorResponse)=>this.error = err.error.message)
        )
    }

    getAllProds(){
        return this.products;
    }
    getMainProducts(){
        let start;
        let end;
        if(this.products.length < 4){
            start = 0;
            end = this.products.length
        }
        else {
            start = this.products.length - 4;
            end = this.products.length + 1;
        }
        return this.products.slice(start,end);
    }

    getHeaderProducts(){
        return this.products.filter((prod,index)=>index !== this.index)
    }
    
    getFavoriteProd(){
        return this.products[this.index];
    }

}