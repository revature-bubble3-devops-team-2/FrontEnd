import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from 'app/models/profile';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profile: Profile={};

  constructor(private http: HttpClient) { }

  setData(profile: Profile){
    this.profile = profile;
  }

  getData(){
    let temp = this.profile;
    this.profile={};
    return temp;
  }

  registerProfile(profile: Profile): Observable<any> {
    return this.http.post('http://localhost:8082/profile', profile)
  }

  getProfileByPid(pid: number): Observable<Profile>{
    return this.http.get(`http://localhost:8082/profile/${pid}`)
  }

  updateProfile(profile: Profile): Observable<Profile>{
    return this.http.put(`http://localhost:8082/profile/${profile.pid}`, profile);
  }
}
