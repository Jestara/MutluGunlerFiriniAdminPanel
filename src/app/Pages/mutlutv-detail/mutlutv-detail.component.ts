import { DomSanitizer } from '@angular/platform-browser';
import { MutlutvService } from './../../Services/mutlutv/mutlutv.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { MutluTV } from './../../Models/MMutluTV';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mutlutv-detail',
  templateUrl: './mutlutv-detail.component.html',
  styleUrls: ['./mutlutv-detail.component.scss']
})
export class MutlutvDetailComponent implements OnInit {
  isLoading: boolean = false;
  mutluTvData: MutluTV;
  button: boolean;
  constructor(private route: ActivatedRoute,
    private toastr: ToastrService,
    private mutluTvService: MutlutvService,
    private router: Router,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getPostByParameter();
  }

  getPostByParameter(){

    this.route.paramMap.subscribe(data => {
      const id = data.get('id');
      if (id) {
        this.button = true;
        this.mutluTvService.getMutluTVById(id).then((response) => {
          this.mutluTvData = response;
            console.log(this.mutluTvData);

        });
      } else {
        this.button = false;
       this.mutluTvData = {
          id: null,
          videoUrl : null,
          description: null,

       };
      }
    })

  }

  onSubmit() {
    this.isLoading = true;
      console.log(this.mutluTvData);

    this.mutluTvService.postMutluTV(this.mutluTvData).subscribe((data) => {
        this.toastr.success('Başarıyla kaydedildi.', '', {
          timeOut: 3000,
          positionClass: 'toast-top-full-width'
        });
        this.isLoading = false;
        setTimeout(() => {
          this.router.navigateByUrl('/mutlutv');
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
              this.router.navigateByUrl('/mutlutv');
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
    this.isLoading = true;
    this.mutluTvService.updateMutluTv(this.mutluTvData).subscribe((data) => {
        this.toastr.success('Başarıyla kaydedildi.', '', {
          timeOut: 3000,
          positionClass: 'toast-top-full-width'
        });
        this.isLoading = false;
        setTimeout(() => {
          this.router.navigateByUrl('/mutlutv');
        }, 1000);
      }, error => {
        if(error['status'] === 200){
          this.toastr.success('Başarıyla kaydedildi.', '', {
            timeOut: 3000,
            positionClass: 'toast-top-full-width'
          });
          this.isLoading = false;
          setTimeout(() => {
            this.router.navigateByUrl('/mutlutv');
          }, 1000);

        }else {
          this.toastr.warning('Lütfen alanları doğru bir şekilde doldurunuz.', '', {
            positionClass: 'toast-top-full-width'
          });
        }
      }
    );
  }


  changeVideoUrl(mutluTV : MutluTV){
    return this.sanitizer.bypassSecurityTrustResourceUrl(mutluTV.videoUrl);
   }


}
