import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MCategory} from "../../Models/MCategory";
import {Service} from "../../Services/service";
import {ToastrService} from "ngx-toastr";

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
    name: null,
    description: null,
    imageUrl: null,
    menuId: null,
    file: null
  };
  menus: any;
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
        this.service.getCategoryById(id).then((response) => {
          this.category = response;
          if (this.category) {
            this.catModel = {
              id: this.category.id,
              name: this.category.name,
              description: this.category.description,
              imageUrl: this.category.imageUrl,
              menuId: this.category.menuId,
              file: this.selectedFile
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
    this.service.postCategory(this.catModel, this.selectedFile);
    this.toastr.success('Başarıyla kaydedildi.', '', {
      timeOut: 4000,
      positionClass: 'toast-top-center'
    });
    setTimeout(() => {
      this.router.navigateByUrl('/category');
    }, 4000);
  }

  onSave() {
    this.service.updateCategory(this.catModel, this.selectedFile);
    this.toastr.success('Başarıyla kaydedildi.', '', {
      timeOut: 4000,
      positionClass: 'toast-top-center'
    });
    setTimeout(() => {
      this.router.navigateByUrl('/category');
    }, 4000);
  }

}
