import { Posts } from './../../Models/MPosts';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
 BASE_URL = 'https://service.mutlugunlerfirini.com.tr/api/';
  // BASE_URL = 'http://localhost/MutluGunlerFirini.WebAPI/api/';
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
    fd.append('description', post.description);
    fd.append('imageUrl', post.imageUrl);
    fd.append('videoUrl', post.videoUrl);
    fd.append('title', post.title);
    fd.append('file', image);
    console.log('SERVİCE POST TİTLE -->');
    console.log(fd['title']);
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
    });
    return this.http.post(this.BASE_URL + 'posts/add', fd, {headers});
  }

  updatePost(post: any, image: any) {
    const fd = new FormData();
    fd.append('id', post.id);
    fd.append('description', post.description);
    fd.append('title', post.title);
    fd.append('imageUrl', post.imageUrl);
    fd.append('videoUrl', post.videoUrl);
    fd.append('file', image);
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
    });
    return this.http.post(this.BASE_URL + 'posts/update', fd, {headers});
  }

  deletePosts(posts: Posts) {

    var postObject = {
      'id': posts.id,
      'description': posts.description,
      'imageUrl' : posts.imageUrl,
      'videoUrl' : posts.videoUrl
    }

    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('celil@gmail.com' + ':' + '1980')
    });
    return this.http.post(this.BASE_URL + 'posts/delete', postObject, {headers});
  }
}
