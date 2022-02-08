import { Post } from 'app/models/post';
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Profile } from 'app/models/profile';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GroupPostService implements OnDestroy {
  private followerPostsSubject = new BehaviorSubject<Post[]>([]);
  private postsSubject = new BehaviorSubject<Post[]>([]);
  private _unsubscribeAll = new Subject<any>();
  private groupPosts: Post[] = [];
  public numLikes!: number;
  public sessionPosts: any[] = [];
  public gid: any;

  constructor(private httpClient: HttpClient) {}

  setPosts(posts: any) {
    this.sessionPosts = posts;
  }

  getAllPosts(): Observable<any> {
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: `${sessionStorage.getItem('Authorization')}`,
      }),
    };

    return this.httpClient.get<Post[]>(
      `${environment.url}/post/page/all`,
      requestOptions
    );
  }

  public createPost(post: Post) {
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: `${sessionStorage.getItem('Authorization')}`,
      }),
    };
    this.httpClient
      .post<Post>(environment.url + '/post', post, requestOptions)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data) => {
        const currentValue = this.postsSubject.value;
        const updatedValue = [...currentValue, data];
        this.postsSubject.next(updatedValue);
      });
  }

  getPosts(): Observable<any> {
    return this.postsSubject.asObservable();
  }

  getMemberPosts(): Post[] {
    return this.groupPosts;
  }

  getPostsByMembers(pageNumber: number): any {
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: `${sessionStorage.getItem('Authorization')}`,
      }),
    };
    this.httpClient
      .get<Post[]>(
        `${environment.url}/groups/${this.gid}/posts`,
        requestOptions
      )
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data) => {
        if (data) {
          this.groupPosts = data;
        }
        return null;
      });
  }

  getNumLikes(post: Post): Observable<number> {
    const headerDict = {
      post: `${post.psid}`,
      find: 'false',
      Authorization: `${sessionStorage.getItem('Authorization')}`,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.httpClient
      .get<number>(environment.url + '/like', requestOptions)
      .pipe(takeUntil(this._unsubscribeAll));
  }

  getLiked(post: Post): Observable<number> {
    const headerDict = {
      post: `${post.psid}`,
      find: 'true',
      Authorization: `${sessionStorage.getItem('Authorization')}`,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.httpClient
      .get<number>(environment.url + '/like', requestOptions)
      .pipe(takeUntil(this._unsubscribeAll));
  }

  postLike(post: Post): Observable<Profile> {
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: `${sessionStorage.getItem('Authorization')}`,
      }),
    };
    return this.httpClient
      .post<Profile>(environment.url + '/like', post, requestOptions)
      .pipe(takeUntil(this._unsubscribeAll));
  }

  deleteLike(post: Post): Observable<Profile> {
    const options = {
      headers: new HttpHeaders({
        Authorization: `${sessionStorage.getItem('Authorization')}`,
      }),
      body: post,
    };
    return this.httpClient
      .delete<Profile>(environment.url + '/like', options)
      .pipe(takeUntil(this._unsubscribeAll));
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
