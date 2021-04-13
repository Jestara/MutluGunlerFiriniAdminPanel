import { ToastrService } from 'ngx-toastr';
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
              private sanitizer: DomSanitizer,
              private toastr: ToastrService,
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
    console.log('POST DELETE -------->')
    this.postsService.deletePosts(p).subscribe((response) => {
      this.toastr.success('İleti Başarıyla Silindi.', '', {
        timeOut: 3000,
        positionClass: 'toast-top-full-width'
      });
      this.isLoading = false;
      setTimeout(() => {
        this.router.navigateByUrl('/posts');
      }, 1000);
      console.log(response);
    }, error => {
      if(error['status'] === 200){
        this.toastr.success('İleti başarıyla silindi.', '', {
          timeOut: 3000,
          positionClass: 'toast-top-full-width'
        });
        this.isLoading = false;
        setTimeout(() => {
          // this.router.navigateByUrl('/posts');
      this.reloadCurrentRoute();
        }, 1000);

      }else {
        this.toastr.warning('Silme işleminde bir hata oluştu !', '', {
          positionClass: 'toast-top-full-width'
        });
      }
    })

    // const dialogRef = this.dialog.open(DialogComponent);
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result === true) {
    //     this.postsService.deletePosts(p);
    //     setTimeout(() => {
    //       location.reload();
    //     }, 2000);
    //   }
    // });
  }
  reloadCurrentRoute() {
    console.log('reloadCurrentRoute WORKED');
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}

}
