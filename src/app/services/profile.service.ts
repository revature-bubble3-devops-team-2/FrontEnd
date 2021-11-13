import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Profile } from '../models/profile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<HttpResponse<Profile>> {    
    console.log("test", username, password);
    return this.http.post<HttpResponse<Profile>>('http://localhost:8082/profile', {username: username, password: password});
  }
}
