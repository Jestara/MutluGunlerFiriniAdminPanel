import { DialogComponent } from './../../../Dialogs/dialog/dialog.component';
import { MutluTV } from './../../../Models/MMutluTV';
import { MutlutvService } from './../../../Services/mutlutv/mutlutv.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mutlutv',
  templateUrl: './mutlutv.component.html',
  styleUrls: ['./mutlutv.component.scss']
})
export class MutlutvComponent implements OnInit {

  mutluTvs: MutluTV[];
  isLoading: boolean = false;
  user: any;

  constructor(private mutluTvService: MutlutvService,
    private router: Router,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getMutluTVs();
  }

  getMutluTVs(){
    this.user = localStorage.getItem('user');
    if (this.user === null) {
      this.router.navigate(['user-pages/login']);
    } else {
      this.isLoading = true;
      this.mutluTvService.getMutluTvs().subscribe((data: MutluTV[]) => {
        this.mutluTvs= data.sort((a,b) => b['id'] - a ['id']);;
        this.isLoading = false;
        console.log('MUTLU TVS-->');
        console.log(this.mutluTvs);
      });
    }

  }

  changeVideoUrl(mutluTv: MutluTV){
    return this.sanitizer.bypassSecurityTrustResourceUrl(mutluTv.videoUrl);
   }


   added(mutluTv) {
    this.router.navigate(['mutlutv-detail', mutluTv.id]);
  }

  delete(mutluTV) {

    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log('MUTLUTV DELETE -------->')
        this.mutluTvService.deleteMutluTV(mutluTV).subscribe((response) => {
          this.toastr.success('MutluTV Başarıyla Silindi.', '', {
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
            this.toastr.success('MutluTV başarıyla silindi.', '', {
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
      }
    });

  }

  reloadCurrentRoute() {
    console.log('reloadCurrentRoute WORKED');
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}

}
