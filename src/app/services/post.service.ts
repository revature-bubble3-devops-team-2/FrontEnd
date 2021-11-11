import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  public createPost(post: Post) {
    return this.httpClient.post<Post>(environment.postURL, post, { headers: {
      "Authorization" : `${sessionStorage.getItem('token')}`
    }});

  }

  constructor(private httpClient: HttpClient) { }
}
