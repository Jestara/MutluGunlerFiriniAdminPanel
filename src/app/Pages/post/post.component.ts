import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './../../Dialogs/dialog/dialog.component';
import { Router } from '@angular/router';
import { Posts } from './../../Models/MPosts';
import { PostsService } from './../../Services/posts/posts.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  posts: Posts[];
  isLoading: boolean = false;
  user: any;
  videoUrl: SafeResourceUrl;
  constructor(private postsService: PostsService,
              private router: Router,
              public dialog: MatDialog,
              private sanitizer: DomSanitizer
    ) { }

  ngOnInit(): void {
    this.getPosts();

  }


  getPosts(){
    this.user = localStorage.getItem('user');
    if (this.user === null) {
      this.router.navigate(['user-pages/login']);
    } else {
      this.isLoading = true;
      this.postsService.getPosts().subscribe((data) => {
        this.posts = data;
        this.isLoading = false;
      });
    }

  }


    changeVideoUrl(post: Posts){
     return this.sanitizer.bypassSecurityTrustResourceUrl(post.videoUrl);
    }
  added(p) {
    this.router.navigate(['post-detail', p.id]);
  }

  delete(p) {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.postsService.deletePosts(p);
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    });
  }

}
