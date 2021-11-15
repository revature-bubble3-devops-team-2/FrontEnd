import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(private http: HttpClient,) {  }

  followUser(id: number)
  {
    return this.http.post("http://localhost:8082/follow", id);
  }
}
