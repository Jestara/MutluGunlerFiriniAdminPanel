import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class Service {
  BASE_URL = 'https://service.mutlugunlerfirini.com.tr/api/';

  constructor(private http: HttpClient) { }

  // GET
  getMenus(){
    return this.http.get(this.BASE_URL + 'menus/getall', {
      headers: {
        Accept: 'application/json',
        Authorization: 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
      }
    });
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




}


