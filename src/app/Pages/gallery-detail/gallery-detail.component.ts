import { GalleryService } from './../../Services/gallery/gallery.service';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Service} from "../../Services/service";
import {ToastrService} from "ngx-toastr";
import {ImageCroppedEvent} from "ngx-image-cropper";
@Component({
  selector: 'app-gallery-detail',
  templateUrl: './gallery-detail.component.html',
  styleUrls: ['./gallery-detail.component.scss']
})
export class GalleryDetailComponent implements OnInit {

  button: boolean;
  galleryModel = {
    id: null,
    imageUrl: null,
    file: null
  };
  isLoading = false;
  gallery: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  fileToReturn: any;

  constructor(private route: ActivatedRoute,
              private galleryService: GalleryService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(data => {
      const id = data.get('id');
      if (id) {
        this.button = true;
        this.galleryService.getGalleriesById(id).then((response) => {
          this.gallery = response;
          if (this.gallery) {
            this.galleryModel = {
              id: this.gallery.id,
              imageUrl: this.gallery.imageUrl,
              file: this.fileToReturn
            };
          }
        });
      } else {
        this.button = false;
      }
    })
  }

  Save(){
    this.galleryService.saveGallery(this.galleryModel, this.fileToReturn).then(() => {

    }, error => {
      if (error['status'] === 200){
        this.showSuccess();
        setTimeout(() => {
          this.router.navigate(['/gallery']);
        }, 2000);
      }
    });
  }

  Update(){
    this.galleryService.updateGallery(this.galleryModel, this.fileToReturn).then(() => {

    }, error => {
      if (error['status'] === 200){
        this.showSuccess();
        setTimeout(() => {
          this.router.navigate(['/gallery']);
        }, 2000);
      }
    });
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

  showSuccess() {
    this.toastr.success('Başarıyla kaydedildi.');
  }
}
