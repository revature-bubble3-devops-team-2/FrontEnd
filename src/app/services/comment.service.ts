import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from 'app/models/comment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  createComment(comment: Comment): Observable<any> {
    console.log(comment);
    return this.http.post('http://localhost:8082/comment', comment)
  }

  getCommentsByPsid(psid: number): Observable<any> {
    console.log(psid);
    return this.http.get(`http://localhost:8082/comment?psid=${psid}`)
  }

  deleteCommentByCid(cid: number): Observable<any> {
    console.log(cid);
    return this.http.delete(`http://localhost:8082/comment/${cid}`)
  }
}
