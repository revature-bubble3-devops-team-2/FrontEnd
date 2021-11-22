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

  private followerPostsSubject = new BehaviorSubject<Post[]>([]);
  private postsSubject = new BehaviorSubject<Post[]>([]);
  private _unsubscribeAll = new Subject<any>();
  public numLikes!: number;

  constructor(private httpClient: HttpClient) {}

  public createPost(post: Post) {
    this.httpClient
      .post<Post>('http://localhost:8082/posts', post)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data) => {
        const currentValue = this.postsSubject.value;
        const updatedValue = [...currentValue, data];
        this.postsSubject.next(updatedValue);
      });
  }

  public getAllPosts(): void {
    this.httpClient
      .get<Post[]>('http://localhost:8082/posts')
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data) => {
        this.postsSubject.next(data as Post[]);
      });
  }

  getPosts(): Observable<any> {
    return this.postsSubject.asObservable();
  }

  getFollowerPosts(): Observable<any> {
    return this.followerPostsSubject.asObservable();
  }

  getPostsByFollowers(pageNumber: number, pid: number): any {
    pid = 1
    this.httpClient
      .get<Post[]>(`http://localhost:8082/posts/profile/${pid}/${pageNumber}`)
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
    const headerDict = {'post': `${post.psid}`, "find": "false"}
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict),
    };
    return this.httpClient.get<number>('http://localhost:8082/like', requestOptions).pipe(takeUntil(this._unsubscribeAll));
  }

  getLiked(post: Post): Observable<number> {
    const headerDict = {'post': `${post.psid}`, "find": "true"}
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict),
    };
    return this.httpClient.get<number>('http://localhost:8082/like', requestOptions).pipe(takeUntil(this._unsubscribeAll));
  }

  postLike(post: Post): Observable<Profile> {
    return this.httpClient.post<Profile>('http://localhost:8082/like', post).pipe(takeUntil(this._unsubscribeAll));
  }

  deleteLike(post: Post): Observable<Profile> {
    const options = {
      body: post,
    };
    return this.httpClient.delete<Profile>('http://localhost:8082/like', options).pipe(takeUntil(this._unsubscribeAll));
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
