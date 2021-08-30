import { MCategory } from './../../Models/MCategory';
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Service} from "../../Services/service";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../Dialogs/dialog/dialog.component";

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
              private service: Service,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    if (this.user === null) {
      this.router.navigate(['user-pages/login']);
    } else {
      this.isLoading = true;
      this.service.getCategories().subscribe((data : MCategory[]) => {
        this.category = data.sort((a,b) => b['id'] - a ['id']);
        console.log(this.category)
        this.isLoading = false;
      });
    }
  }

  added(c) {
    this.router.navigate(['category-detail', c.id]);
  }

  delete(c) {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.service.deleteCategory(c);
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    });
  }

}
