import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Service} from "../../Services/service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: any;
  selectedFile: File;
  proModel = {
    id: null,
    name: null,
    description: null,
    imageUrl: null,
    price: null,
    categoryId: null,
    file: null
  };
  categories: any;
  button: boolean;

  constructor(private route: ActivatedRoute,
              private service: Service,
              private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(data => {
      const id = data.get('id');
      if (id) {
        this.button = true;
        this.service.getProductById(id).then((response) => {
          this.product = response;
          if (this.product) {
            this.proModel = {
              id: this.product.id,
              name: this.product.name,
              description: this.product.description,
              imageUrl: this.product.imageUrl,
              price: this.product.price,
              categoryId: this.product.categoryId,
              file: this.selectedFile
            };
          }
        });
      } else {
        this.button = false;
      }
    })
    this.service.getCategories().subscribe(data => {
      this.categories = data;
    })
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    this.service.postProduct(this.proModel, this.selectedFile);
    this.toastr.success('Başarıyla kaydedildi.', '', {
      timeOut: 4000,
      positionClass: 'toast-top-center'
    });
    setTimeout(() => {
      this.router.navigateByUrl('/product');
    }, 4000);
  }

  onSave() {
    this.service.updateProduct(this.proModel, this.selectedFile);
    this.toastr.success('Başarıyla kaydedildi.', '', {
      timeOut: 4000,
      positionClass: 'toast-top-center'
    });
    setTimeout(() => {
      this.router.navigateByUrl('/product');
    }, 4000);
  }

}
