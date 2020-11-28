import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Service} from "../../Services/service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  category: any;


  constructor(private router: Router,
              private service: Service) {
  }

  ngOnInit(): void {
     this.service.getCategories().subscribe((data)=>{
       this.category = data;
       console.log(this.category)
     });


  }

  added(c) {
    this.router.navigate(['category-detail',c]);
  }

  delete(c){
    this.service.deleteCategory(c);
  }

}
