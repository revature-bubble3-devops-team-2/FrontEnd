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

  constructor(private http: HttpClient) { }

  setData(profile: Profile){
    this.profile = profile;
  }

  getProfile(){
    return this.profile;
  }

  setImhg(img : any){
    this.profile.imgurl = img;
  }

  getData(){
    let temp = this.profile;
    this.profile={};
    return temp;
  }

  registerProfile(profile: Profile): Observable<any> {
    return this.http.post(environment.url+'/profile/register', profile,
    {observe: 'response'});
  }

  getProfileByPid(pid: number): Observable<Profile>{
    return this.http.get(`${environment.url}/profile/${pid}`)
  }

  updateProfile(profile: Profile): Observable<any>{
    let token = sessionStorage.getItem("Authorization");
    if(token){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token });
      let options = { headers: headers };
      return this.http.put(`${environment.url}/profile`, profile, options);
    } else {
      return this.http.put(`${environment.url}/profile`, profile);
   }
  }





  login(username: string, password: string): Observable<HttpResponse<Profile>>{
    return this.http.post<Profile>(environment.url+'/profile/login', `username=${username}&password=${password}`, { observe: 'response', headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }
  getProfileByToken(): Observable<HttpResponse<Profile>> {
    var token = sessionStorage.getItem("Authorization");
    return this.http.post<Profile>(environment.url+'/profile/token', `token=${token}`, { observe: 'response', headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }




//   baseApiUrl = "https://file.io";

//   upload(file : any):Observable<any> {

//     // Create form data
//     const formData = new FormData();

//     // Store form name as "file" with file data
//     formData.append("file", file, file.name);

//     // Make http post request over api
//     // with formData as req

//     this.http.post(this.baseApiUrl, formData).subscribe((data : any)=> console.log(data.key) )
//     return this.http.post(this.baseApiUrl, formData)
// }


// upload2(file : any): any {

//   // Create form data
//   const formData = new FormData();

//   // Store form name as "file" with file data
//   formData.append("file", file, file.name);

//   // Make http post request over api
//   // with formData as req
//   this.http.post(this.baseApiUrl, formData).subscribe((data)=> console.log(data) )
// }



}
