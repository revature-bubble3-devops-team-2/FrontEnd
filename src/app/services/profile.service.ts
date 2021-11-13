import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Profile } from '../models/profile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<HttpResponse<Profile>> {    
    
    const body = new HttpParams()
                  .set('username', username)
                  .set('password', password);

    console.log("test", username, password, "Object:", body);
    return this.http.post<HttpResponse<Profile>>('http://localhost:8082/profile', body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
}
