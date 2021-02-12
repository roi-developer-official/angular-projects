import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import * as fromApp from '../../store/app.reducer';
import * as productsAction from '../store/products.actions';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  displayProducts: Product[] = [];
  productPerPage = 3;
  currentPage;
  loading:boolean;
  pages = [];
  show:boolean[] = [];
  categories = [];
  subCategoriesArray = [];
  mainCategory: string;
  subCategory: string;
  mainImageUrl:string= null;
  error: string;

  constructor(
    private store: Store<fromApp.AppState>,
    private ativatedRoute: ActivatedRoute,
    private basketService:BasketService,
    private router:Router
  ) {}


  ngOnInit(): void {
    this.store.dispatch(new productsAction.GetCategories());
    this.store.dispatch(new productsAction.GetAllProds());
    this.ativatedRoute.queryParams.subscribe((params) => {
      this.mainCategory = params.meal;
      this.subCategory = params.sub;
      if(!this.mainCategory){
        return this.router.navigate(['/home'])
      }
      this.store.select('product').subscribe((state) => {
        this.loading = state.loading;
        if (state.error) {
          this.error = this.error;
        } else {
          this.products = state.products;
          this.categories = state.categories;
          this.initSubCategories();
          this.initPagination();
        }
      });
    });

    if (this.products.length === 0) {
      this.store.dispatch(new productsAction.GetAllProdsStart());
    }
  }
  

  filterProducts() {
    if (!this.subCategory) {
      this.displayProducts = this.products.filter((prod) =>
        prod.categories.includes(this.mainCategory)
      );
    } else {
      this.displayProducts = this.products.filter(
        (prod) => prod.name === this.subCategory
      );
    }
    return this.displayProducts;
  }

  initSubCategories() {
    this.subCategoriesArray = this.categories.find(
      (cat) => cat.value === this.mainCategory
    ).subCtg;
  }

  initPagination() {
    this.displayProducts = this.filterProducts();
    if(this.displayProducts.length > 0)
      this.mainImageUrl = this.displayProducts[this.displayProducts.length - 1].imageUrl;
    this.pages = [];
    if(this.displayProducts.length < this.productPerPage){
      return;
    }
    for (
      let i = 0;
      i < Math.floor(this.displayProducts.filter(prod=>prod).length / this.productPerPage) + 1;
      i++
    ) {
      this.pages.push(i + 1);
    }
    this.setPageNumber(1);
  }

  setPageNumber(pagenum) {
    this.show = [];
    this.currentPage = pagenum;
    let end = this.currentPage * this.productPerPage;
    let start = end - this.productPerPage;
    this.displayProducts = this.filterProducts();
    this.displayProducts = this.displayProducts.slice(start, end);
  }


  displayDetails(index:number){
    this.show = [];
    this.show[index] = true;
  }

  hideDetails(){
    this.show = [];
    this.basketService.closeBasket();
  }

  addToBasket(index:number){
    const product = this.displayProducts[index]
    this.basketService.addToBasket(product)
  }


}
