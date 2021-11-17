import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommentService } from 'app/services/comment.service';
import { Comment } from 'app/models/comment';
import { Post } from 'app/models/post';
import { Profile } from 'app/models/profile';
import { DatePipe } from '@angular/common';

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
  profile: Profile = {};
  isWriter: boolean = false;
  commentData: Comment = {};
  commentWriter: Profile = {};
  commentLocaleDate: string = "";

  constructor(
    public commentService: CommentService, 
    public activeModal: NgbActiveModal
    ) {}

  ngOnInit(): void {

    var modaled = document.querySelector('.modal-content');
    modaled?.setAttribute("style","border-radius:30px;");
    
    this.getCommentsByPsid();
    let sessionProfile = sessionStorage.getItem("profile");
    if(sessionProfile!=null){
      this.profile = JSON.parse(sessionProfile);
      console.log(this.profile)
    } 
  }

  deleteCommentByCid(cid?: number){
    if(cid){
      this.commentService.deleteCommentByCid(cid).subscribe(
        (result)=>{
          console.log(result);
          this.getCommentsByPsid();
        }
      )
    }
    
  }

  dateFormat(d: Date){
    if(d){
      var formattedDate = (d.getMonth() + 1)  + "-"  +d.getDate()+  "-"+ d.getFullYear() ;
      var hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
      var minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
      var formattedTime = hours + ":" + minutes;
      formattedDate = formattedDate + " " + formattedTime;
      if(formattedDate)
        this.commentLocaleDate = formattedDate;
    }
  }

  checkWriterForEachComment(comment: Comment){
    this.isWriter=false;
    this.commentData = comment;
    var temp = this.commentData.dateCreated;
    var d;
    if(temp){
      d = new Date(temp);
      this.dateFormat(d);
    }   
    if(comment.writer){
      this.commentWriter = comment.writer;
    }
    if(this.commentWriter.pid==this.profile.pid){
      this.isWriter = true;
      return true;
    }else{
      return true;
    }
  }

  getCommentsByPsid(){
    console.log(this.post);
    if(this.post.psid){
      this.commentService.getCommentsByPsid(this.post.psid).subscribe(
        (result)=>{
          this.comments = result;
          //console.log(this.comments)
        }
      )
    }  
  }

  submitComment(comment: Comment){
    console.log(this.post);
    comment.post = this.post;
    comment.dateCreated = new Date();
    // let sessionProfile = sessionStorage.getItem("profile");
    // if(sessionProfile!=null){
    //   comment.writer = JSON.parse(sessionProfile);
    // } 
    comment.writer = this.profile;
    //console.log(comment);
    this.commentService.createComment(comment).subscribe(
      (result)=>{
        //console.log(result)
        this.getCommentsByPsid();
      }
    )
  }
}
