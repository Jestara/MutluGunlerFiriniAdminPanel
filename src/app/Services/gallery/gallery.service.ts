import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  //  BASE_URL = 'https://service.mutlugunlerfirini.com.tr/api/';
    BASE_URL = 'http://localhost/MutluGunlerFirini.WebAPI/api/';
  constructor(private http: HttpClient) { }

  getGalleries() {
    return this.http.get(this.BASE_URL + 'galleries/getall', {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
      }
    });
  }

  getGalleriesById(id) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('celil@gmail.com' + ':' + '1980'),
      Accept: 'application/json'
    });
    return this.http.get(this.BASE_URL + 'galleries/getbyid?galleryId=' + id, {headers}).toPromise();
  }

  saveGallery(gallery: any, file: File) {
    const fd = new FormData();
    fd.append('file', file);
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
    });
    return this.http.post(this.BASE_URL + 'galleries/add', fd, {headers}).toPromise();
  }

  updateGallery(gallery: any, file: File) {
    const fd = new FormData();
    fd.append('id', gallery.id);
    fd.append('file', file);
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
    });
    return this.http.post(this.BASE_URL + 'galleries/update', fd, {headers}).toPromise();
  }

  deleteGallery(gallery: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
    });
    return this.http.post(this.BASE_URL + 'galleries/delete', gallery, {headers}).toPromise();
  }
}
