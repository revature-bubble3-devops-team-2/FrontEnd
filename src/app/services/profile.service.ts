import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from 'app/models/profile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient,) { }

  registerProfile(profile: Profile): Observable<any> {
    return this.http.post('http://localhost:8082/profiles', profile)
  }
}
