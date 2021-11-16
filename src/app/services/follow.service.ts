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
    return this.http.post("http://localhost:8082/follow", `token=${this.token}&email=${email}`);
  }
  
  followUserById(id: number): Observable<any>
  {
    return this.http.post("http://localhost:8082/follow", `token=${this.token}&id=${id}`);
  }
}
