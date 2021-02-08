import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-main-header-image',
  templateUrl: './main-header-image.component.html',
  styleUrls: ['./main-header-image.component.css']
})
export class MainHeaderImageComponent implements OnInit {


  scaleIt:boolean = false;
  @Output() productSelected = new EventEmitter<string>();
  @Input() prod;


  ngOnInit(): void {}

  onSelectProduct(id:string){
    this.productSelected.emit(id)
  }


}
