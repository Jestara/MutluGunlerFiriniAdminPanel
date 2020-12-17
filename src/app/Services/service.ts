import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MCategory} from '../Models/MCategory';
import {MMenu} from '../Models/MMenu';
import {Observable} from 'rxjs';
import {MProduct} from '../Models/MProduct';


@Injectable({
  providedIn: 'root'
})
export class Service {
  BASE_URL = 'https://service.mutlugunlerfirini.com.tr/api/';
  // BASE_URL = 'https://localhost:44352/api/';

  constructor(private http: HttpClient) {
  }

  // GET
  getMenus() {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('celil@gmail.com' + ':' + '1980'),
      Accept: 'application/json'
    });
    return this.http.get<MMenu>(this.BASE_URL + 'menus/getall', {headers});
  }
  getMenuById(id) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('celil@gmail.com' + ':' + '1980'),
      Accept: 'application/json'
    });
    return this.http.get<MMenu>(this.BASE_URL + 'menus/getbyid?menuId=' + id, {headers}).toPromise();
  }

  getCategories() {
    return this.http.get(this.BASE_URL + 'categories/getall', {
      headers: {
        Accept: 'application/json',
        Authorization: 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
      }
    });
  }
  getCategoryById(id) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('celil@gmail.com' + ':' + '1980'),
      Accept: 'application/json'
    });
    return this.http.get<MCategory>(this.BASE_URL + 'categories/getbyid?categoryId=' + id, {headers}).toPromise();
  }

  getProducts() {
    return this.http.get(this.BASE_URL + 'products/getall', {
      headers: {
        Accept: 'application/json',
        Authorization: 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
      }
    });
  }

  getProductById(id) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('celil@gmail.com' + ':' + '1980'),
      Accept: 'application/json'
    });
    return this.http.get<MProduct>(this.BASE_URL + 'products/getbyid?productId=' + id, {headers}).toPromise();
  }

  getUsers() {
    return this.http.get(this.BASE_URL + 'users/login', {
      headers: {
        Accept: 'application/json',
        Authorization: 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
      }
    });
  }

  // Post
  postMenu(menu: any, file: File) {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('name', menu.name);
    fd.append('description', menu.description);
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
    });
    return this.http.post(this.BASE_URL + 'menus/add', fd, {headers});
  }

  postCategory(category: any, file: File) {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('name', category.name);
    fd.append('description', category.description);
    fd.append('menuId', category.menuId);
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
    });
    return this.http.post(this.BASE_URL + 'categories/add', fd, {headers});
  }

  postProduct(product: any, image: any) {
    const fd = new FormData();
    fd.append('name', product.name);
    fd.append('description', product.description);
    fd.append('imageUrl', image);
    fd.append('price', product.price);
    fd.append('categoryId', product.categoryId);
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
    });
    return this.http.post(this.BASE_URL + 'products/add', fd, {headers});
  }

  postUser(user: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
    });
    return this.http.post(this.BASE_URL + 'users/login', user, {headers}).toPromise();
  }

  // update
  updateMenu(menu: any, file: File) {
    const fd = new FormData();
    fd.append('id', menu.id);
    fd.append('name', menu.name);
    fd.append('description', menu.description);
    fd.append('imageUrl', menu.imageUrl);
    fd.append('file', file);
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
    });
    return this.http.post(this.BASE_URL + 'menus/update', fd, {headers});
  }

  updateCategory(category: any, file: File) {
    const fd = new FormData();
    fd.append('id', category.id);
    fd.append('name', category.name);
    fd.append('description', category.description);
    fd.append('imageUrl', category.imageUrl);
    fd.append('menuId', category.menuId);
    fd.append('file', file);
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
    });
    return this.http.post(this.BASE_URL + 'categories/update', fd, {headers});
  }

  updateProduct(product: any, image: any) {
    const fd = new FormData();
    fd.append('id', product.id);
    fd.append('name', product.name);
    fd.append('description', product.description);
    fd.append('imageUrl', image);
    fd.append('price', product.price);
    fd.append('categoryId', product.categoryId);
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
    });
    return this.http.post(this.BASE_URL + 'products/update', fd, {headers});
  }


  // delete
  deleteMenu(menu: MMenu) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
    });
    return this.http.post(this.BASE_URL + 'menus/delete', menu, {headers}).toPromise();
  }

  deleteCategory(category: MCategory) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
    });
    return this.http.post(this.BASE_URL + 'categories/delete', category, {headers}).toPromise();
  }

  deleteProduct(product: MProduct) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
    });
    return this.http.post(this.BASE_URL + 'products/delete', product, {headers}).toPromise();
  }


}


