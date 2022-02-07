import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  token = sessionStorage.getItem("Authorization");

  constructor(private http: HttpClient,) {  }

  followUserByEmail(email: string , id:number): Observable<HttpResponse<String>> {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `${this.token}`}),}
    return this.http.post<HttpResponse<String>>(`${environment.url}/profile/follow`, `email=${email}&id=${id}`, httpOptions);
  }

  followUserById(id: number): Observable<any>
  {
      const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `${this.token}`}),
      }
      return this.http.post<any>(`${environment.url}/profile/follow`, `id=${id}`, httpOptions);
  }

  unfollowUserByEmail(email: string): Observable<any>
  {
      const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
                                  'Authorization': `${this.token}`
                                }),
      }
      return this.http.post<any>(`${environment.url}/profile/unfollow`, `email=${email}`, httpOptions);
  }

  unfollowUserById(id: number): Observable<any>
  {
      const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
                                  'Authorization': `${this.token}`
                                }),
      }
      return this.http.post<any>(`${environment.url}/profile/unfollow`, `id=${id}`, httpOptions);
  }
}
