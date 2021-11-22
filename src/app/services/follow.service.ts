import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  token = sessionStorage.getItem("Authorization");

  constructor(private http: HttpClient,) {  }

  followUserByEmail(email: string): Observable<any>
  {
    return this.http.post<string>("http://localhost:8082/follow", `token=${this.token}&email=${email}`, { observe: 'response', headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }

  followUserById(id: number): Observable<any>
  {
    return this.http.post<string>("http://localhost:8082/follow", `token=${this.token}&id=${id}`, { observe: 'response', headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }

  unfollowUserByEmail(email: string): Observable<any>
  {
      const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
                                  'Authorization': `${this.token}`
                                }),
      }
      return this.http.post<any>("http://localhost:8082/profile/unfollow", `email=${email}`, httpOptions);
  }

  unfollowUserById(id: number): Observable<any>
  {
      const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
                                  'Authorization': `${this.token}`
                                }),
      }
      const body = JSON.stringify({'id': id});
      return this.http.post<any>("http://localhost:8082/profile/unfollow", `id=${id}`, httpOptions);
  }
}
