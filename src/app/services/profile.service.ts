import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../models/profile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {    
    return this.http.post('http://localhost:8082/login', {username: username, password: password});
  }
}
