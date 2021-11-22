import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  token = sessionStorage.getItem("Authorization");

  constructor(private http: HttpClient,) {  }

  followUserByEmail(email: string): Observable<HttpResponse<string>>
  {
    return this.http.post<string>("http://localhost:8082/follow", `token=${this.token}&email=${email}`, { observe: 'response', headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }

  followUserById(id: number): Observable<HttpResponse<string>>
  {
    return this.http.post<string>("http://localhost:8082/follow", `token=${this.token}&id=${id}`, { observe: 'response', headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }

  unfollowUserByEmail(email: string): Observable<HttpResponse<string>>
  {
      const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
                                  'Authorization': `${this.token}`
                                }),
      }
      const body = JSON.stringify({'email': email});
      return this.http.post<any>("http://localhost:8082/profile/unfollow", body, httpOptions);
  }

  unfollowUserById(id: number): Observable<HttpResponse<string>>
  {
      const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
                                  'Authorization': `${this.token}`
                                }),
      }
      const body = JSON.stringify({'id': id});
      return this.http.post<any>("http://localhost:8082/profile/unfollow", body, httpOptions);
  }
}
