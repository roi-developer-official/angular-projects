import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.css'],
})
export class SubCategoriesComponent {
  @Output() hideProdCtgs = new EventEmitter();
  @Input() showProdCtgsInput: boolean;
  @Input() categories = [];
  mainCategory:string;
  subCtgs = [];
  showProdCtgs = true;

  showSubCategories(subCtgs,mainCategory) {
    this.mainCategory = mainCategory;
    this.subCtgs = subCtgs;
  }
  onMouseLeave(event) {
    let toElement;
    if (event.toElement) {
  
      toElement = event.toElement.className.split(' ')[0];
      if(toElement === 'nav-item'){
        return;
      }
      if (
        (toElement !== 'nav_item__products' && toElement !== 'category_link' && toElement !== 'products_categories') ||
        toElement === 'nav-container'
      ) {
        this.showProdCtgs = false;
        this.subCtgs = [];
        this.hideProdCtgs.emit();
      }
    } else {
      this.hideProdCtgs.emit()
      this.showProdCtgs = false;
    }
  }
  hide(){
    this.hideProdCtgs.emit();
    this.showProdCtgs = false;
  }

}
