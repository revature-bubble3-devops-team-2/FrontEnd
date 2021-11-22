import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { Profile } from '../models/profile';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profile: Profile={};

  setData(profile: Profile){
    this.profile = profile;
  }

  getData(){
    let temp = this.profile;
    this.profile={};
    return temp;
  }

  constructor(private http: HttpClient,) { }

  // Sends post request to the profile controller that then responds
  // with httpstatus code
  registerProfile(profile: Profile): Observable<any> {
    return this.http.post(environment.url+'/profile/register', profile,
    {observe: 'response'});
  }

  getProfileByPid(pid: number): Observable<Profile>{
    return this.http.get(`${environment.url}/profile/profiles/${pid}`)
  }

  updateProfile(profile: Profile): Observable<any>{
    let token = sessionStorage.getItem("Authorization");
    if(token){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token });
      let options = { headers: headers };
      return this.http.put(`${environment.url}/profile/profiles/${profile.pid}`, profile, options);
    }else{
      return this.http.put(`${environment.url}/profile/profiles/${profile.pid}`,profile);
   }
  }

  login(username: string, password: string): Observable<HttpResponse<string>> {
    return this.http.post<string>(environment.url+'/profile/login', `username=${username}&password=${password}`, { observe: 'response', headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }
  getProfileByToken(): Observable<HttpResponse<Profile>> {
    var token = sessionStorage.getItem("Authorization");
    return this.http.post<Profile>(environment.url+'/profile/token', `token=${token}`, { observe: 'response', headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }
}
