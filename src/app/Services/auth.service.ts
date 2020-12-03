import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogged = false;
  user: any;

  constructor() { }

  getUser(){
    this.user = localStorage.getItem('user');
    if (this.user === undefined){
      this.isLogged = false;
    }else{
      this.isLogged = true;
    }
  }

  login(){
    this.isLogged = true;
  }

  logout(){
    this.isLogged = false;
  }
}
