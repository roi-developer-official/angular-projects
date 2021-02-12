import {  Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-main-header-image',
  templateUrl: './main-header-image.component.html',
  styleUrls: ['./main-header-image.component.css']
})
export class MainHeaderImageComponent implements OnInit {

  scaleIt:boolean = false;
  @Output() productSelected = new EventEmitter<string>();
  @Input() prod;
  @Input() max;
  @Input() margin;
  dynFont:boolean;
  subscription;
  showImg = false;

  ngOnInit(): void {
    if(window.innerWidth < 1200){
      this.dynFont = false;
    } else {
      this.dynFont = true;
    }
    fromEvent(window, 'resize').subscribe(
      (window:any)=>{
        if(window.currentTarget.innerWidth < 1200){
         this.dynFont = false;
        } else {
          this.dynFont = true;
        }
      }
    )
  }

  onSelectProduct(id:string){
    this.productSelected.emit(id)

  }


}
