import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Service} from "../../Services/service";
import {ToastrService} from "ngx-toastr";
import {base64ToFile, ImageCroppedEvent} from "ngx-image-cropper";

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
    name: '',
    description: '',
    imageUrl: null,
    price: null,
    categoryId: null,
    file: null
  };
  categories: any;
  button: boolean;
  isLoading = false;

  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileToReturn: any;


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
              file: this.fileToReturn
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
    this.isLoading = true;
    this.service.postProduct(this.proModel, this.fileToReturn).subscribe((data) => {
        this.toastr.success('Başarıyla kaydedildi.', '', {
          timeOut: 3000,
          positionClass: 'toast-top-full-width'
        });
        this.isLoading = false;
        setTimeout(() => {
          this.router.navigateByUrl('/product');
        }, 1000);
      }, error => {
        this.toastr.warning('Lütfen alanları doğru bir şekilde doldurunuz.', '', {
          positionClass: 'toast-top-full-width'
        });
      }
    );
  }

  onSave() {
    this.isLoading = true;
    this.service.updateProduct(this.proModel, this.fileToReturn).subscribe((data) => {
        this.toastr.success('Başarıyla kaydedildi.', '', {
          timeOut: 3000,
          positionClass: 'toast-top-full-width'
        });
        this.isLoading = false;
        setTimeout(() => {
          this.router.navigateByUrl('/product');
        }, 1000);
      }, error => {
        this.toastr.warning('Lütfen alanları doğru bir şekilde doldurunuz.', '', {
          positionClass: 'toast-top-full-width'
        });
      }
    );
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.fileToReturn = this.base64ToFile(
      event.base64,
      this.imageChangedEvent.target.files[0].name
    )
    console.log(this.fileToReturn);
    return this.fileToReturn;
  }

  base64ToFile(data, filename) {
    // Gelen base64 kodunu file dosyasına dönüştürdük.
    const arr = data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename,  {type: 'image/png'});
  }
}
