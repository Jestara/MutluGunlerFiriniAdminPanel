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
  isLoading = false;


  constructor(private router: Router,
              private service: Service) {
  }

  ngOnInit(): void {
    this.isLoading = true;
     this.service.getCategories().subscribe((data)=>{

       this.category = data;
       console.log(this.category)
       this.isLoading = false;
     });


  }

  added(c) {
    this.router.navigate(['category-detail',c]);
  }

  delete(c){
    this.service.deleteCategory(c);
  }

}
