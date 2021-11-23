import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from 'app/models/comment';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  createComment(comment: Comment): Observable<any> {
    console.log(comment);
    return this.http.post(`${environment.url}/comment`, comment)
  }

  getCommentsByPsid(psid: number): Observable<any> {
    console.log(psid);
    return this.http.get(`${environment.url}/comment?psid=${psid}`)
  }

  deleteCommentByCid(cid: number): Observable<any> {
    console.log(cid);
    return this.http.delete(`${environment.url}/comment/${cid}`)
  }
}
