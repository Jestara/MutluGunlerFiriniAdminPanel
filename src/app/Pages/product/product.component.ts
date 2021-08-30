import { MProduct } from './../../Models/MProduct';
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Service} from "../../Services/service";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../Dialogs/dialog/dialog.component";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: any;
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
      this.service.getProducts().subscribe((data: MProduct[]) => {
        this.product = data.sort((a,b) => b['id'] - a ['id']);;
        this.isLoading = false;
      });
    }
  }

  added(p) {
    this.router.navigate(['product-detail', p.id]);
  }

  delete(p) {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.service.deleteProduct(p);
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    });
  }

}
