import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() categories;
  @Input() mainCat;
  subCat;
  constructor(private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(
      (params)=>{
        this.subCat = params.sub;
      }
    )
    
  }

}
