import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../models/post';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { Profile } from 'app/models/profile';

@Injectable({
  providedIn: 'root',
})
export class PostService implements OnDestroy {
  private postsSubject = new BehaviorSubject<Post[]>([]);
  constructor(private httpClient: HttpClient) {}
  private _unsubscribeAll = new Subject<any>();
  public numLikes!: number;

  public createPost(post: Post) {
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders({
        "Authorization": `${sessionStorage.getItem("Authorization")}`
      })
    };
    this.httpClient
      .post<Post>('http://localhost:8082/posts', post, requestOptions)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data) => {
        const currentValue = this.postsSubject.value;
        const updatedValue = [...currentValue, data];
        this.postsSubject.next(updatedValue);
      });
  }

  public getAllPosts(): void {
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders({
        "Authorization": `${sessionStorage.getItem('Authorization')}`
      })
    };
    this.httpClient
      .get<Post[]>('http://localhost:8082/posts', requestOptions)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data) => {
        this.postsSubject.next(data as Post[]);
      });
  }

  getPosts(): Observable<any> {
    return this.postsSubject.asObservable();
  }

  getNumLikes(post: Post): Observable<number> {
    const headerDict = {'post': `${post.psid}`, "find": "false", "Authorization": `${sessionStorage.getItem('Authorization')}`};
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict)
    };
    return this.httpClient.get<number>('http://localhost:8082/like', requestOptions).pipe(takeUntil(this._unsubscribeAll));
  }

  getLiked(post: Post): Observable<number> {
    const headerDict = {'post': `${post.psid}`, "find": "true", "Authorization": `${sessionStorage.getItem('Authorization')}`};
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict)
    };
    return this.httpClient.get<number>('http://localhost:8082/like', requestOptions).pipe(takeUntil(this._unsubscribeAll));
  }

  postLike(post: Post): Observable<Profile> {
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders({
        "Authorization": `${sessionStorage.getItem('Authorization')}`
      })
    };
    return this.httpClient.post<Profile>('http://localhost:8082/like', post, requestOptions).pipe(takeUntil(this._unsubscribeAll));
  }

  deleteLike(post: Post): Observable<Profile> {
    const options = {
      headers: new HttpHeaders({
        "Authorization": `${sessionStorage.getItem('Authorization')}`
      }),
      body: post,
    };
    return this.httpClient.delete<Profile>('http://localhost:8082/like', options).pipe(takeUntil(this._unsubscribeAll));
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
