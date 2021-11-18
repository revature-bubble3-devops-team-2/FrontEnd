import { Profile } from 'app/models/profile';
import { Injectable, Input, OnDestroy } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../models/post';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class PostService implements OnDestroy {
  
  private followerPostsSubject = new BehaviorSubject<Post[]>([]);
  private postsSubject = new BehaviorSubject<Post[]>([]);
  constructor(private httpClient: HttpClient) {}
  private _unsubscribeAll = new Subject<any>();
  public numLikes!: number;

  public createPost(post: Post) {
    console.log(post);
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

  getNumLikes(post: Post): Observable<number> {
    console.log("getnumlikes called");
    const headerDict = {'post': `${post.psid}`}
    console.log(post.psid);
    const requestOptions = {                                                                        headers: new HttpHeaders(headerDict),
    };

    return this.httpClient.get<number>('http://localhost:8082/like', requestOptions).pipe(takeUntil(this._unsubscribeAll));
  }

  postLike(post: Post): Observable<any> {
    console.log("postlike called");
    return this.httpClient.post<Post>('http://localhost:8082/like', post).pipe(takeUntil(this._unsubscribeAll));
    
  }

  getPostsByFollowers(id: number): any {
    this.httpClient
      .get<Post[]>(`http://localhost:8082/posts/page/${id}`)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data) => {
        this.followerPostsSubject.next(data as Post[]);
      });
  }


  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
