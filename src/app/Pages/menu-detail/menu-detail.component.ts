import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Service} from "../../Services/service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MMenu} from "../../Models/MMenu";
import {HttpClient, HttpHeaders} from "@angular/common/http";

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
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.menu = data;
      if (this.menu.id) {
        this.menuModel = {
          id: this.menu.id,
          name: this.menu.name,
          description: this.menu.description,
          imageUrl: this.menu.imageUrl,
          file: this.selectedFile
        };
        this.button = true;
      } else {
        this.button = false;
      }
    })
  }


  onSubmit() {
    this.service.postMenu(this.menuModel, this.selectedFile);
    setTimeout(() => {
      this.router.navigate(['/menu']);
    }, 2000);
  }

  onSave() {
    this.service.updateMenu(this.menuModel, this.selectedFile);
    this.router.navigate(['/menu']);
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

}
