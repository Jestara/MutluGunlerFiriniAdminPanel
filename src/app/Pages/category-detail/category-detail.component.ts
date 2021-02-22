import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MCategory} from "../../Models/MCategory";
import {Service} from "../../Services/service";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {ImageCroppedEvent} from "ngx-image-cropper";

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {
  category: any;
  selectedFile: File;
  catModel = {
    id: null,
    name: '',
    description: '',
    imageUrl: null,
    menuId: null,
    file: null
  };
  menus: any;
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
        this.service.getCategoryById(id).then((response) => {
          this.category = response;
          if (this.category) {
            this.catModel = {
              id: this.category.id,
              name: this.category.name,
              description: this.category.description,
              imageUrl: this.category.imageUrl,
              menuId: this.category.menuId,
              file: this.fileToReturn
            };
          }
        });
      } else {
        this.button = false;
      }
    })
    this.service.getMenus().subscribe(data => {
      this.menus = data;
    })
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    this.isLoading = true;
    this.service.postCategory(this.catModel, this.fileToReturn).subscribe((data) => {
      this.toastr.success('Başarıyla kaydedildi.', '', {
        timeOut: 3000,
        positionClass: 'toast-top-full-width'
      });
      this.isLoading = false;
      setTimeout(() => {
        this.router.navigateByUrl('/category');
      }, 1000);
      },error =>
      {
        this.toastr.warning('Lütfen alanları doğru bir şekilde doldurunuz.', '', {
          positionClass: 'toast-top-full-width'
        });
      }
    );
  }

  onSave() {
    this.isLoading = true;
    this.service.updateCategory(this.catModel, this.fileToReturn).subscribe((data) => {
        this.toastr.success('Başarıyla kaydedildi.', '', {
          timeOut: 3000,
          positionClass: 'toast-top-full-width'
        });
      this.isLoading = false;
        setTimeout(() => {
          this.router.navigateByUrl('/category');
        }, 1000);
      },error =>
      {
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
      this.imageChangedEvent.target.files[0].name,
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
    return new File([u8arr], filename, {type: mime});
  }

}
