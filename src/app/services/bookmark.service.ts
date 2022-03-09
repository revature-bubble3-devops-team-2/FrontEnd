import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { Profile } from 'app/models/profile';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  constructor(private httpClient: HttpClient) {}
  
  /*getBookmarkByPsid(psid: number): Observable<any> {
    console.log(psid);
    return this.http.get(`${environment.url}/favorites?psid=${psid}`)
  }*/
  

  
}
