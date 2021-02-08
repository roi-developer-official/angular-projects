import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import { Product } from '../../product.model';
import * as productsActions from '../../store/products.actions';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit, OnDestroy {
  addProductForm: FormGroup;
  file: File = null;
  isFile = false;
  subscription;
  prodId: string = null;
  error: string;
  editMode: boolean = false;
  categoriesCon = [
    { name: 'ארוחת בוקר' },
    { name: 'ארוחת צהריים' },
    { name: 'ארוחת ערב' },
    { name: 'משקאות' },
    { name: 'קינוחים' },
  ];

  constructor(
    private store: Store<fromApp.AppState>,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}


  ngOnDestroy(): void {
    if (this.editMode) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.addProductForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      description: new FormControl(''),
      ingredients: new FormArray([]),
      categories: new FormArray([
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
      ]),
      homeProd: new FormControl(false),
    });

    this.activeRoute.queryParams.subscribe((params) => {
      this.editMode = params['editMode'] === 'true';
      if (this.editMode) {
        this.prodId = this.activeRoute.snapshot.params['prodId'];
        this.store.dispatch(
          new productsActions.GetSingleProdStart(this.prodId)
        );
        this.subscription = this.store.select('product').subscribe((state) => {
          if (state.error) {
            this.error = state.error;
          } else if (state.product) {
            this.fillFormFields(state.product);
          }
        });
      } else {
        this.addProductForm.reset();
      }
    });
  }


  fillFormFields(product: Product) {
    this.addProductForm.get('name').setValue(product.name)
    this.addProductForm.get('title').setValue(product.title);
    this.addProductForm.get('description').setValue(product.description);
    this.addProductForm.get('price').setValue(product.price);
    this.addProductForm.get('homeProd').setValue(product.homeProd.toString());

    product.categories.map((cat) => {
      let index = this.categoriesCon.findIndex((name) => name.name === cat);
      (<FormArray>this.addProductForm.get('categories'))
        .at(index)
        .setValue(true);
    });

    if ((<FormArray>this.addProductForm.get('ingredients')).length === 0)
      for (let ing of product.ingredients) {
        (<FormArray>this.addProductForm.get('ingredients')).push(
          new FormControl(ing)
        );
      }
  }


  onSubmit() {
    const {
      title,
      description,
      price,
      ingredients,
      name,
      homeProd,
    } = this.addProductForm.controls;

    let { categories } = this.addProductForm.controls;
    const formedCats = [];
    categories.value.map((cat: string, index: number) => {
      if (cat) {
        formedCats.push(this.categoriesCon[index].name);
      }
    });

    const formData = new FormData();
    formData.append('title', title.value);
    formData.append('description', description.value);
    formData.append('name', name.value);
    formData.append('price', price.value);
    formData.append('image', this.file);
    formData.append('ingredients', ingredients.value);
    formData.append('categories', formedCats.toString());
    formData.append('homeProd', homeProd.value);
    
    if (this.editMode) {
      formData.append('_id', this.prodId);
      this.store.dispatch(new productsActions.EditProdStart(formData));
    } else {
      this.store.dispatch(new productsActions.AddProdStart(formData));
    }

    this.router.navigate(['/admin/products']);
    this.addProductForm.reset();
    
  }










  addFile(event) {
    this.file = event.target.files[0];
    this.isFile = true;
  }

  addControl() {
    (<FormArray>this.addProductForm.get('ingredients')).push(
      new FormControl(null)
    );
  }

  deleteControl(index) {
    (<FormArray>this.addProductForm.get('ingredients')).removeAt(index);
  }

  getControls() {
    return (<FormArray>this.addProductForm.get('ingredients')).controls;
  }


}
