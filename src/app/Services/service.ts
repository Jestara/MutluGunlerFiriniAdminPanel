import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MCategory} from "../Models/MCategory";
import {MMenu} from "../Models/MMenu";
import {Observable} from "rxjs";
import {MProduct} from "../Models/MProduct";


@Injectable({
  providedIn: 'root'
})
export class Service {
  // BASE_URL = 'https://service.mutlugunlerfirini.com.tr/api/';
  BASE_URL = 'https://localhost:44352/api/';

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
  postMenu(menu: any, file: File) {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('name', menu.name);
    fd.append('description', menu.description);
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
    });
    return this.http.post(this.BASE_URL + 'menus/add', fd, {headers}).toPromise();
  }

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

  postProduct(product: MProduct) {
    const obj = {
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      price: parseFloat(String(product.price)),
      categoryId: parseInt(String(product.categoryId))
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
    });
    return this.http.post(this.BASE_URL + 'products/add', obj, {headers}).toPromise();
  }

  postUser(user: any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
    });
    return this.http.post(this.BASE_URL + 'users/login', user, {headers}).toPromise();
  }

  //update
  updateMenu(menu: MMenu) {
    const obj = {
      id: parseInt(String(menu.id)),
      name: menu.name,
      description: menu.description,
      imageUrl: menu.imageUrl,
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
    });
    return this.http.post(this.BASE_URL + 'menus/update', obj, {headers}).toPromise();
  }

  updateCategory(category: MCategory) {
    const obj = {
      id: parseInt(String(category.id)),
      name: category.name,
      description: category.description,
      imageUrl: category.imageUrl,
      menuId: parseInt(String(category.menuId))
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
    });
    return this.http.post(this.BASE_URL + 'categories/update', obj, {headers}).toPromise();
  }

  updateProduct(product: MProduct) {
    const obj = {
      id: parseInt(String(product.id)),
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      price: parseFloat(String(product.price)),
      categoryId: parseInt(String(product.categoryId))
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
    });
    return this.http.post(this.BASE_URL + 'products/update', obj, {headers}).toPromise();
  }


  //delete
  deleteMenu(menu: MMenu) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
    });
    return this.http.post(this.BASE_URL + 'menus/delete', menu, {headers}).toPromise();
  }

  deleteCategory(category: MCategory) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
    });
    return this.http.post(this.BASE_URL + 'categories/delete', category, {headers}).toPromise();
  }

  deleteProduct(product: MProduct) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
    });
    return this.http.post(this.BASE_URL + 'products/delete', product, {headers}).toPromise();
  }






}


