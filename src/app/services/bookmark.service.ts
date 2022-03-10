import { Post } from 'app/models/post';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Profile } from 'app/models/profile';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  private _unsubscribeAll = new Subject<any>();

  constructor(private httpClient: HttpClient) {}

  /*getBookmarkByPsid(psid: number): Observable<any> {
    console.log(psid);
    return this.http.get(`${environment.url}/favorites?psid=${psid}`)
  }*/

  postBookmark(post: Post): Observable<Profile> {
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: `${sessionStorage.getItem('Authorization')}`,
      }),
    };
    return this.httpClient
      .post<Profile>(environment.url + '/bookmark', post, requestOptions)
      .pipe(takeUntil(this._unsubscribeAll));
  }

  deleteBookmark(post: Post): Observable<Profile> {
    const options = {
      headers: new HttpHeaders({
        Authorization: `${sessionStorage.getItem('Authorization')}`,
      }),
      body: post,
    };
    return this.httpClient
      .delete<Profile>(environment.url + '/bookmark', options)
      .pipe(takeUntil(this._unsubscribeAll));
  }
}
