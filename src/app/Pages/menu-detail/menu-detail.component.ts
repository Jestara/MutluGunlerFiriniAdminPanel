import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Service} from "../../Services/service";

@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.component.html',
  styleUrls: ['./menu-detail.component.scss']
})
export class MenuDetailComponent implements OnInit {
  menu: any;
  menuModel = {
    id: null,
    name: null,
    description: null,
    imageUrl: null,
  };
  button: boolean;

  constructor(private route: ActivatedRoute,
              private service: Service) { }

  ngOnInit(): void {
    this.route.params.subscribe(data=>{
      this.menu = data;
      if (this.menu.id){
        this.menuModel = {
          id: this.menu.id,
          name: this.menu.name,
          description: this.menu.description,
          imageUrl: this.menu.imageUrl
        };
        this.button = true;
      }else{
        this.button = false;
      }
    })
  }

  onSubmit(){
    this.service.postMenu(this.menuModel);
  }

  onSave(){
    this.service.updateMenu(this.menuModel);
  }

}
