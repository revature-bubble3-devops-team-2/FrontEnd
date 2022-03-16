import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from 'app/models/post';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { Profile } from 'app/models/profile';
import { Notification } from 'app/models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private _unsubscribeAll = new Subject<any>();
  private notificationSubject = new BehaviorSubject<Post[]>([]);

  constructor(private httpClient: HttpClient) { }

  postNotification(notification: Notification): Observable<Profile> {
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: `${sessionStorage.getItem('Authorization')}`,
      }),
    };
    return this.httpClient
      .post<Profile>(environment.url + '/notification', notification, requestOptions)
      .pipe(takeUntil(this._unsubscribeAll));
  }

  getNotifications(toProfileId: number): Observable<any> {
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: `${sessionStorage.getItem('Authorization')}`,
      }),
    };
    return this.httpClient.get<Post[]>(
      `${environment.url}/notification/${toProfileId}`,
      requestOptions
    );
  }

  updateNotification(toProfileId: number, notification: Notification): Observable<Profile> {
    let token = sessionStorage.getItem("Authorization");
    if(token){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token });
      let options = { headers: headers };
      return this.httpClient.put(`${environment.url}/${toProfileId}/update`, notification, options);
    } else {
        return this.httpClient.put(`${environment.url}/${toProfileId}/update`, notification);
    }
  }

}
