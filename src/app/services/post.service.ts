import { Profile } from 'app/models/profile';
import { Injectable, Input, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../models/post';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService implements OnDestroy {
  posts = [
    {
      psid: 1,
      creator: new Profile(1, "First", "Last", "Pass", "a@lachlan.dev", "FL"),
      body: "A new post.",
      imgURL: "https://source.unsplash.com/random/300x300",
      datePosted: Date.parse("16 Nov 2021 00:00:00 GMT")
    },
    {
      psid: 2,
      creator: new Profile(2, "Amy", "Aadams", "Pass", "ant@lachlan.dev", "aaadams"),
      body: "Hello everyone!",
      imgURL: "https://source.unsplash.com/random/300x300",
      datePosted: Date.parse("17 Nov 2021 00:00:00 GMT")
    },
    {
      psid: 3,
      creator: new Profile(2, "Amy", "Aadams", "Pass", "ant@lachlan.dev", "aaadams"),
      body: "Another post.",
      imgURL: "https://source.unsplash.com/random/300x300",
      datePosted: Date.parse("18 Nov 2021 00:00:00 GMT")
    }
  ];
  
  private postsSubject = new BehaviorSubject<Post[]>([]);
  constructor(private httpClient: HttpClient) {}
  private _unsubscribeAll = new Subject<any>();
  public numLikes!: number;

  public createPost(post: Post) {
    this.httpClient
      .post<Post>('http://localhost:8082/posts', post)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data) => {
        const currentValue = this.postsSubject.value;
        const updatedValue = [...currentValue, data];
        this.postsSubject.next(updatedValue);
      });
    // return this.httpClient.post<Post>(environment.postURL, post, { headers: {
    //   "Authorization" : `${sessionStorage.getItem('token')}`
    // }});
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

  getNumLikes(post: Post): Observable<number> {
    console.log("getnumlikes called");
    const headerDict = {'post': `${post.psid}`}
    console.log(post.psid);
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict),
    };

    return this.httpClient.get<number>('http://localhost:8082/like', requestOptions).pipe(takeUntil(this._unsubscribeAll));
  }

  postLike(post: Post): Observable<any> {
    console.log("postlike called");
    return this.httpClient.post<Post>('http://localhost:8082/like', post).pipe(takeUntil(this._unsubscribeAll));
    
  }

  getPostsByFollowers(): any {
    return this.posts;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
