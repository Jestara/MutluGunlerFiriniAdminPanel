import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class Service {
  BASE_URL = 'https://eserservice.eserhizliokuma.com/api/';

  constructor(private http: HttpClient) { }

  // GET
  getCategories(){
    return this.http.get(this.BASE_URL + 'students/getall', {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
      }
    });
  }




}


