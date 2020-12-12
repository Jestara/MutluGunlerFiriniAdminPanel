import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Service} from "../../Services/service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MMenu} from "../../Models/MMenu";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

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
    this.service.postMenu(this.menuModel, this.selectedFile);
    this.toastr.success('Başarıyla kaydedildi.', '', {
      timeOut: 3000,
      positionClass: 'toast-top-center'
    });
    setTimeout(() => {
      this.router.navigateByUrl('/menu');
    }, 3000);
  }

  onSave() {
    this.service.updateMenu(this.menuModel, this.selectedFile).subscribe((data) => {
      this.menu = data;
    });
    this.toastr.success('Başarıyla kaydedildi.', '', {
      timeOut: 3000,
      positionClass: 'toast-top-full-width'
    });
    setTimeout(() => {
      this.router.navigateByUrl('/menu');
    }, 3000);
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

}
