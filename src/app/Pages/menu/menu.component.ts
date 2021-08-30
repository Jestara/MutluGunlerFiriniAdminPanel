import { MMenu } from './../../Models/MMenu';
import {Component, OnInit} from '@angular/core';
import {Service} from '../../Services/service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../Dialogs/dialog/dialog.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menu: any;
  user: any;
  isLoading = false;


  constructor(private service: Service,
              private router: Router,
              public dialog: MatDialog) {
  }


  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    if (this.user === null) {
      this.router.navigate(['user-pages/login']);
    } else {
      this.isLoading = true;
      this.service.getMenus().subscribe((data: MMenu[] ) => {
        this.menu = data.sort((a,b) => b['id'] - a ['id']);;
        this.isLoading = false;
      });
    }
  }


  edit(m) {
    this.router.navigate(['menu-detail', m.id]);
  }

  delete(m) {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.service.deleteMenu(m);
        setTimeout(() => {
          location.reload();
        }, 3000);
      }
    });
  }

}
