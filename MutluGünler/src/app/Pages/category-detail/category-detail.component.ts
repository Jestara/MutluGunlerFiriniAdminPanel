import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MCategory} from "../../Models/MCategory";
import {Service} from "../../Services/service";

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {
  category: any;
  catModel = {
    id: null,
    name: null,
    description: null,
    imageUrl: null,
    menuId: null
  };
  menus: any;
  button: boolean;

  constructor(private route: ActivatedRoute,
              private service: Service) { }

  ngOnInit(): void {
    this.route.params.subscribe(data=>{
      this.category = data;
      if (this.category.id){
        this.catModel = {
          id: this.category.id,
          name: this.category.name,
          description: this.category.description,
          imageUrl: this.category.imageUrl,
          menuId: this.category.menuId
        };
        this.button = true;
      }else{
        this.button = false;
      }
    })
    this.service.getMenus().subscribe(data=>{
      this.menus = data;
    })
  }

  onSubmit(){
    this.service.postCategory(this.catModel);
  }

  onSave(){
    console.log(this.catModel);
  }

}
