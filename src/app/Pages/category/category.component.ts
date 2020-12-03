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
  user: any;

  constructor(private router: Router,
              private service: Service) {
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    if (this.user === null) {
      this.router.navigate(['user-pages/login']);
    } else {
      this.isLoading = true;
      this.service.getCategories().subscribe((data) => {
        this.category = data;
        console.log(this.category)
        this.isLoading = false;
      });
    }
  }

  added(c) {
    this.router.navigate(['category-detail', c]);
  }

  delete(c) {
    this.service.deleteCategory(c);
  }

}
