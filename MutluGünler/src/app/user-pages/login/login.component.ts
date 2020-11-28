import { Component, OnInit } from '@angular/core';
import {Service} from "../../Services/service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: any;
  password: any;
  response: any;


  constructor(private service: Service,
              private route: Router,
              private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  Login(){
    const obj = {
      email: this.email,
      password: this.password
    }
  this.service.postUser(obj).then((data) => {
    this.response = data;
    if (data === null){
      const message = 'Yanlış kullanıcı adı veya şifre girdiniz.';
      this.openSnackBar(message);
    }
    else{
      console.log('giriş yapıldı');
      this.route.navigate(['/']);
    }
  });
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, '', {
      duration: 2000
    });
  }

}

