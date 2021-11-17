import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommentService } from 'app/services/comment.service';
import { Comment } from 'app/models/comment';
import { Post } from 'app/models/post';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {
  @Input() 
  post!: Post;
  comment: Comment= {};
  comments!: Comment[];

  constructor(
    public commentService: CommentService, 
    public activeModal: NgbActiveModal
    ) {}

  ngOnInit(): void {
    this.getCommentsByPsid();
  }

  getCommentsByPsid(){
    console.log(this.post);
    if(this.post.psid){
      this.commentService.getCommentsByPsid(this.post.psid).subscribe(
        (result)=>{
          this.comments = result;
        }
      )
    }  
  }

  submitComment(comment: Comment){
    console.log(this.post);
    comment.post = this.post;
    comment.dateCreated = new Date();
    let sessionProfile = sessionStorage.getItem("profile");
    if(sessionProfile!=null){
      comment.writer = JSON.parse(sessionProfile);
    } 
    console.log(comment);
    this.commentService.createComment(comment).subscribe(
      (result)=>{
        console.log(result)
        this.getCommentsByPsid();
      }
    )
  }
}
