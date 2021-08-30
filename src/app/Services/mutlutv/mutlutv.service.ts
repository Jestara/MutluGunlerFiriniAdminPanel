import { MutluTV } from './../../Models/MMutluTV';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MutlutvService {
 BASE_URL = 'https://service.mutlugunlerfirini.com.tr/api/';
//  BASE_URL = 'http://localhost/MutluGunlerFirini.WebAPI/api/';
  constructor(private http: HttpClient) { }



    getMutluTvs(){
      return this.http.get<MutluTV[]>(this.BASE_URL + 'mutlutv/getall', {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
        }
      });
    }

    getMutluTVById(id) {
      const headers = new HttpHeaders({
        Authorization: 'Basic ' + btoa('celil@gmail.com' + ':' + '1980'),
        Accept: 'application/json'
      });
      return this.http.get<MutluTV>(this.BASE_URL + 'mutlutv/getbyid?mutluTvId=' + id, {headers}).toPromise();
    }

    postMutluTV(mutluTv: MutluTV) {

      var mutluTvObject ={
        'videoUrl': mutluTv.videoUrl,
        'description': mutluTv.description,
      }

      console.log('SERVİCE MUTLU TV -->');

      const headers = new HttpHeaders({
        Authorization: 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
      });
      return this.http.post(this.BASE_URL + 'mutlutv/add', mutluTvObject, {headers});
    }

    updateMutluTv(mutluTv: MutluTV) {

      const headers = new HttpHeaders({
        Authorization: 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
      });
      return this.http.post(this.BASE_URL + 'mutlutv/update', mutluTv, {headers});
    }

    deleteMutluTV(mutluTv: MutluTV) {
      var mutluTvObject = {
        'id': mutluTv.id,
        'description': mutluTv.description,
        'videoUrl' : mutluTv.videoUrl
      }

      const headers = new HttpHeaders({
        Authorization: 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
      });
      return this.http.post(this.BASE_URL + 'mutlutv/delete', mutluTvObject, {headers});
    }

}
