import { MGallery } from './../../Models/MGallery';
import { GalleryService } from './../../Services/gallery/gallery.service';
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../Dialogs/dialog/dialog.component";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  gallery: any;
  user: any;
  isLoading = false;

  constructor(private galleryService: GalleryService,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.user = localStorage.getItem('user');
    if (this.user === null){
      this.router.navigate(['/user-pages/login']);
    }else{
     this.getGalleryPhotos();
    }
  }

  added(c) {
    this.router.navigate(['gallerydetail', c.id]);
  }

      getGalleryPhotos(){
        this.galleryService.getGalleries().subscribe((data: MGallery[])=>{
          this.gallery = data.sort((a,b) => b['id'] - a ['id']);
          this.isLoading = false;
        });
      }
  edit(e){
    this.router.navigate(['gallerydetail', e.id]);
  }

  delete(e){
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.galleryService.deleteGallery(e).then(() => {

        }, error => {
          if (error['status'] === 200) {
            this.ngOnInit();
          }
        });
      }
    });
  }

}
