import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Service} from "../../Services/service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MMenu} from "../../Models/MMenu";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {ImageCroppedEvent} from "ngx-image-cropper";

@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.component.html',
  styleUrls: ['./menu-detail.component.scss']
})
export class MenuDetailComponent implements OnInit {
  menu: any;
  selectedFile: File;
  menuModel = {
    id: null,
    name: '',
    description: '',
    imageUrl: '',
    file: null
  };
  button: boolean;
  isLoading = false;

  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(private route: ActivatedRoute,
              private service: Service,
              private formBuilder: FormBuilder,
              private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(data => {
      const id = data.get('id');
      if (id) {
        this.button = true;
        this.service.getMenuById(id).then((response) => {
          this.menu = response;
          if (this.menu) {
            this.menuModel = {
              id: this.menu.id,
              name: this.menu.name,
              description: this.menu.description,
              imageUrl: this.menu.imageUrl,
              file: this.selectedFile
            };
          }
        });
      } else {
        this.button = false;
      }
    })
  }


  onSubmit() {
    this.isLoading = true;
    this.service.postMenu(this.menuModel, this.selectedFile).subscribe((data) => {
        this.toastr.success('Başarıyla kaydedildi.', '', {
          timeOut: 3000,
          positionClass: 'toast-top-full-width'
        });
      this.isLoading = false;
        setTimeout(() => {
          this.router.navigateByUrl('/menu');
        }, 3000);
      }, error => {
        this.toastr.warning('Lütfen alanları doğru bir şekilde doldurunuz.', '', {
          positionClass: 'toast-top-full-width'
        });
      }
    );
  }

  onSave() {
    this.isLoading = true;
    this.service.updateMenu(this.menuModel, this.selectedFile).subscribe((data) => {
        this.toastr.success('Başarıyla kaydedildi.', '', {
          timeOut: 3000,
          positionClass: 'toast-top-full-width'
        });
      this.isLoading = false;
        setTimeout(() => {
          this.router.navigateByUrl('/menu');
        }, 3000);
      }, error => {
        this.toastr.warning('Lütfen alanları doğru bir şekilde doldurunuz.', '', {
          positionClass: 'toast-top-full-width'
        });
      }
    );
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

}
