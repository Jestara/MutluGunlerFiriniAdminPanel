import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Service} from "../../Services/service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: any;
  proModel = {
    id: null,
    name: null,
    description: null,
    imageUrl: null,
    price: null,
    categoryId: null
  };
  categories: any;
  button: boolean;

  constructor(private route: ActivatedRoute,
              private service: Service) { }

  ngOnInit(): void {
    this.route.params.subscribe(data=>{
      this.product = data;
      if (this.product.id){
        this.proModel = {
          id: this.product.id,
          name: this.product.name,
          description: this.product.description,
          imageUrl: this.product.imageUrl,
          price: this.product.price,
          categoryId: this.product.categoryId
        };
        this.button = true;
      }else{
        this.button = false;
      }
    })
    this.service.getCategories().subscribe(data=>{
      this.categories = data;
    })
  }
  onSubmit(){
    this.service.postProduct(this.proModel);
  }

  onSave(){
    console.log(this.proModel);
  }

}
