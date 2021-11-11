import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  public createPost(post: Post) {
    console.log(post);
    return this.httpClient.post<Post>("http://localhost:8082/posts", post);
    return this.httpClient.post<Post>(environment.postURL, post, { headers: {
      "Authorization" : `${sessionStorage.getItem('token')}`
    }});

  }

  public getAllPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>("http://localhost:8082/posts");
  }

  constructor(private httpClient: HttpClient) { }
}
