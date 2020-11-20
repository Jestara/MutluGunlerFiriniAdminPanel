import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MCategory} from "../Models/MCategory";
import {MMenu} from "../Models/MMenu";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class Service {
  BASE_URL = 'https://service.mutlugunlerfirini.com.tr/api/';

  constructor(private http: HttpClient) { }

  // GET
  getMenus(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('celil@gmail.com' + ':' + '1980'),
      'Accept': 'application/json'
    });
    return this.http.get<MMenu>(this.BASE_URL + 'menus/getall', {headers});
  }

  getCategories(){
    return this.http.get(this.BASE_URL + 'categories/getall', {
      headers: {
        Accept: 'application/json',
        Authorization: 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
      }
    });
  }

  getProducts(){
    return this.http.get(this.BASE_URL + 'products/getall', {
      headers: {
        Accept: 'application/json',
        Authorization: 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
      }
    });
  }

  getUsers(){
    return this.http.get(this.BASE_URL + 'users/login', {
      headers: {
        Accept: 'application/json',
        Authorization: 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
      }
    });
  }

  //Post
  postCategory(category: MCategory) {
    const obj = {
      name: category.name,
      description: category.description,
      imageUrl: category.imageUrl,
      menuId: parseInt(String(category.menuId))
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
    });
    return this.http.post(this.BASE_URL + 'categories/add', obj, {headers}).toPromise();
  }




}


