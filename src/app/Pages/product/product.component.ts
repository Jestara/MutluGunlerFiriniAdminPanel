import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Service} from "../../Services/service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: any;
  isLoading = false;
  constructor(private router: Router,
              private service: Service) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.service.getProducts().subscribe((data)=>{
      this.product = data;
      this.isLoading = false;
    });
  }

  added(p) {
    this.router.navigate(['product-detail', p]);
  }

  delete(p){
    this.service.deleteProduct(p);
  }

}