import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
<<<<<<< HEAD
import { Observable } from 'rxjs';
=======
import { environment } from '../../environments/environment';

>>>>>>> df8e35ab204855995f7baee785cc4192af23c2b3

@Injectable({
  providedIn: 'root'
})
export class PostService {

  public createPost(post: Post) {
<<<<<<< HEAD
    console.log(post);
    return this.httpClient.post<Post>("http://localhost:8082/posts", post);
=======
    return this.httpClient.post<Post>(environment.postURL, post, { headers: {
      "Authorization" : `${sessionStorage.getItem('token')}`
    }});

>>>>>>> df8e35ab204855995f7baee785cc4192af23c2b3
  }

  public getAllPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>("http://localhost:8082/posts");
  }

  constructor(private httpClient: HttpClient) { }
}
