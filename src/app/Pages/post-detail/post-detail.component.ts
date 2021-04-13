import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { PostsService } from './../../Services/posts/posts.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Posts } from './../../Models/MPosts';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  selectedFile: File;
  categories: any;
  button: boolean;
  isLoading: boolean = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  post: Posts;
  fileToReturn: any = null;
  isPhoto: boolean;
  isSelected: boolean;
  constructor(private route: ActivatedRoute,
    private toastr: ToastrService,
    private postsService: PostsService,
    private router: Router,
    private sanitizer: DomSanitizer
    ) {


     }



  ngOnInit(): void {
    this.getPostByParameter();
  }

  getPostByParameter(){

    this.route.paramMap.subscribe(data => {
      const id = data.get('id');
      if (id) {
        this.button = true;
        this.postsService.getPostsById(id).then((response) => {
          this.post = response;
          this.isSelected = true
            console.log(this.post);
            if(this.post.imageUrl){
              this.isPhoto = true;
            }else {
              this.isPhoto = false;
              document.getElementById('videoIFrame').setAttribute('src',  this.post.videoUrl);
            }
        });
      } else {
        this.button = false;
       this.post = {
          id: null,
          imageUrl: null,
          videoUrl : null,
          description: null,
          title: null
       };
      }
    })

  }

  changeVideoUrl(post: Posts){
    return this.sanitizer.bypassSecurityTrustResourceUrl(post.videoUrl);
   }

  onSubmit() {
    this.isLoading = true;
      console.log(this.post);
    console.log(this.fileToReturn);
    this.postsService.postPosts(this.post, this.fileToReturn).subscribe((data) => {
        this.toastr.success('Başarıyla kaydedildi.', '', {
          timeOut: 3000,
          positionClass: 'toast-top-full-width'
        });
        this.isLoading = false;
        setTimeout(() => {
          this.router.navigateByUrl('/posts');
        }, 1000);
      }, error => {

        console.log(error['status']);
          if(error['status'] === 200){
            this.toastr.success('Başarıyla kaydedildi.', '', {
              timeOut: 3000,
              positionClass: 'toast-top-full-width'
            });
            this.isLoading = false;
            setTimeout(() => {
              this.router.navigateByUrl('/posts');
            }, 1000);

          }else {
            this.toastr.warning('Lütfen alanları doğru bir şekilde doldurunuz.', '', {
              positionClass: 'toast-top-full-width'
            });
          }
      }
    );
  }

  onSave() {
    console.log('UPDATE POST -->');
  console.log(this.post);
    this.isLoading = true;
    this.postsService.updatePost(this.post, this.fileToReturn).subscribe((data) => {
        this.toastr.success('Başarıyla kaydedildi.', '', {
          timeOut: 3000,
          positionClass: 'toast-top-full-width'
        });
        this.isLoading = false;
        setTimeout(() => {
          this.router.navigateByUrl('/posts');
        }, 1000);
      }, error => {
        if(error['status'] === 200){
          this.toastr.success('Başarıyla kaydedildi.', '', {
            timeOut: 3000,
            positionClass: 'toast-top-full-width'
          });
          this.isLoading = false;
          setTimeout(() => {
            this.router.navigateByUrl('/posts');
          }, 1000);

        }else {
          this.toastr.warning('Lütfen alanları doğru bir şekilde doldurunuz.', '', {
            positionClass: 'toast-top-full-width'
          });
        }
      }
    );
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  selectPostType(boolValue: boolean){
    this.isPhoto = boolValue;
    this.isSelected = true;
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.fileToReturn = this.base64ToFile(
      event.base64,
      this.imageChangedEvent.target.files[0].name
    )
    console.log(this.fileToReturn);
    return this.fileToReturn;
  }

  base64ToFile(data, filename) {
    // Gelen base64 kodunu file dosyasına dönüştürdük.
    const arr = data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename,  {type: 'image/png'});
  }

}
