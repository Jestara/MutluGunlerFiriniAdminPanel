import {Component, OnInit} from '@angular/core';
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
              private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  Login() {
    const obj = {
      email: this.email,
      password: this.password
    }
    this.service.postUser(obj).then((data) => {
      this.response = data;
      if (this.response === null) {
        const message = 'Yanlış kullanıcı adı veya şifre girdiniz.';
        this.openSnackBar(message);
      } else {
        localStorage.setItem('user', JSON.stringify(obj));
        const user = this.response.firstName + ' ' + this.response.lastName;
        localStorage.setItem('login', user);
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

