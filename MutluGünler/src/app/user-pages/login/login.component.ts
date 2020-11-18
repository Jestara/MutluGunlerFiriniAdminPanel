import { Component, OnInit } from '@angular/core';
import {Service} from "../../Services/service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: any;
  password: any;
  constructor(private service: Service) { }

  ngOnInit() {
  }

  Login(){
  console.log(this.email + this.password);
  }

}
