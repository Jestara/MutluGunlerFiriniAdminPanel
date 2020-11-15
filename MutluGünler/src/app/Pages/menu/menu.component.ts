import { Component, OnInit } from '@angular/core';
import {Service} from "../../Services/service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menu: any;

  constructor(private service: Service,
              private router: Router) { }

  ngOnInit(): void {
    this.service.getProducts().subscribe((data)=>{
      this.menu = data;
      console.log(this.menu)
    });
  }

  added(c) {
    this.router.navigate(['menu-detail',c]);
  }

}
