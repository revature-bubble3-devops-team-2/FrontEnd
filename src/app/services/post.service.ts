import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../models/post';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { Profile } from 'app/models/profile';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService implements OnDestroy {

  private followerPostsSubject = new BehaviorSubject<Post[]>([]);
  private postsSubject = new BehaviorSubject<Post[]>([]);
  private _unsubscribeAll = new Subject<any>();
  public numLikes!: number;

  constructor(private httpClient: HttpClient) {}

  public createPost(post: Post) {
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders({
        "Authorization": `${sessionStorage.getItem("Authorization")}`
      })
    };
    this.httpClient
      .post<Post>(environment.url+'/post', post, requestOptions)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data) => {
        const currentValue = this.postsSubject.value;
        const updatedValue = [...currentValue, data];
        this.postsSubject.next(updatedValue);
      });
  }

  // public getAllPosts(): void {
  //   const requestOptions = {                                                                                                                                                                                 
  //     headers: new HttpHeaders({
  //       "Authorization": `${sessionStorage.getItem('Authorization')}`
  //     })
  //   };
  //   this.httpClient
  //     .get<Post[]>(environment.url+'/post', requestOptions)
  //     .pipe(takeUntil(this._unsubscribeAll))
  //     .subscribe((data) => {
  //       this.postsSubject.next(data as Post[]);
  //     });
  // }

  getPosts(): Observable<any> {
    return this.postsSubject.asObservable();
  }

  getFollowerPosts(): Observable<any> {
    return this.followerPostsSubject.asObservable();
  }

  getPostsByFollowers(pageNumber: number): any {
    const requestOptions = {                                                                                                                                                                                 
          headers: new HttpHeaders({
            "Authorization": `${sessionStorage.getItem('Authorization')}`
          })
        };
    this.httpClient
      .get<Post[]>(`${environment.url}/post/page/${pageNumber}`, requestOptions)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data) => {
        if (data) {
          const currentValue = this.followerPostsSubject.value;
          const updatedValue = currentValue.concat(data);
          this.followerPostsSubject.next(updatedValue);
        }
        return null;
      });
  }

  getNumLikes(post: Post): Observable<number> {
    const headerDict = {'post': `${post.psid}`, "find": "false", "Authorization": `${sessionStorage.getItem('Authorization')}`};
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict)
    };
    return this.httpClient.get<number>(environment.url+'/like', requestOptions).pipe(takeUntil(this._unsubscribeAll));
  }

  getLiked(post: Post): Observable<number> {
    const headerDict = {'post': `${post.psid}`, "find": "true", "Authorization": `${sessionStorage.getItem('Authorization')}`};
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict)
    };
    return this.httpClient.get<number>(environment.url+'/like', requestOptions).pipe(takeUntil(this._unsubscribeAll));
  }

  postLike(post: Post): Observable<Profile> {
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders({
        "Authorization": `${sessionStorage.getItem('Authorization')}`
      })
    };
    return this.httpClient.post<Profile>(environment.url+'/like', post, requestOptions).pipe(takeUntil(this._unsubscribeAll));
  }

  deleteLike(post: Post): Observable<Profile> {
    const options = {
      headers: new HttpHeaders({
        "Authorization": `${sessionStorage.getItem('Authorization')}`
      }),
      body: post,
    };
    return this.httpClient.delete<Profile>(environment.url+'/like', options).pipe(takeUntil(this._unsubscribeAll));
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
