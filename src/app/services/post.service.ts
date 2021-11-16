import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../models/post';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class PostService implements OnDestroy {
  private postsSubject = new BehaviorSubject<Post[]>([]);
  constructor(private httpClient: HttpClient) {}
  private _unsubscribeAll = new Subject<any>();

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

  getNumLikes(): void {
    const headerDict = {'post': '1'}
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict),
    };
    this.httpClient
      .get<Post[]>('http://localhost:8082/like', requestOptions)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data) => {
        console.log("GET request was successful ", data);
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
