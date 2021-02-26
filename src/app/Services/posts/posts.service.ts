import { Posts } from './../../Models/MPosts';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
 // BASE_URL = 'https://service.mutlugunlerfirini.com.tr/api/';
  BASE_URL = 'http://localhost/MutluGunlerFirini.WebAPI/api/';
  constructor(private http: HttpClient) { }


  getPosts() {
    return this.http.get<Posts[]>(this.BASE_URL + 'posts/getall', {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
      }
    });
  }

  getPostsById(id) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('celil@gmail.com' + ':' + '1980'),
      Accept: 'application/json'
    });
    return this.http.get<Posts>(this.BASE_URL + 'posts/getbyid?postsId=' + id, {headers}).toPromise();
  }


  postPosts(post: any, image: any) {

    const fd = new FormData();
    fd.append('createdDate', post.createdDate);
    fd.append('description', post.description);
    fd.append('imageUrl', post.imageUrl);
    fd.append('videoUrl', post.videoUrl);
    fd.append('file', image);
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
    });
    return this.http.post(this.BASE_URL + 'posts/add', fd, {headers});
  }

  updatePost(post: any, image: any) {
    const fd = new FormData();
    fd.append('id', post.id);
    fd.append('createdDate', post.createdDate);
    fd.append('description', post.description);
    fd.append('imageUrl', post.imageUrl);
    fd.append('videoUrl', post.videoUrl);
    fd.append('file', image);
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
    });
    return this.http.post(this.BASE_URL + 'posts/update', fd, {headers});
  }

  deletePosts(posts: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
    });
    return this.http.post(this.BASE_URL + 'posts/delete', posts, {headers});
  }
}
