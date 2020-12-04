import { Component, OnInit } from '@angular/core';
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
    name: null,
    description: null,
    imageUrl: null,
    file: null
  };
  button: boolean;
  menuAddForm: FormGroup;
  menuu: MMenu;

  constructor(private route: ActivatedRoute,
              private service: Service,
              private formBuilder: FormBuilder,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(data=>{
      this.menu = data;
      if (this.menu.id){
        this.menuModel = {
          id: this.menu.id,
          name: this.menu.name,
          description: this.menu.description,
          imageUrl: this.menu.imageUrl,
          file: this.selectedFile
        };
        this.button = true;
      }else{
        this.button = false;
      }
    })
    this.createMenuAddForm();
  }

  createMenuAddForm() {
    this.menuAddForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });
  }

  add(){
    this.menuu = Object.assign({}, this.menuAddForm.value);
    console.log(this.menuu);
  }

  onSubmit(){
    this.service.postMenu(this.menuModel, this.selectedFile);
  }

  onSave(){
    this.service.updateMenu(this.menuModel);
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  /*const fd = new FormData();
  fd.append('file', this.selectedFile)
  const headers = new HttpHeaders({
    'Authorization': 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
  });
  this.http.post('https://localhost:44352/api/menus/add', fd, {headers}).toPromise();*/
}
