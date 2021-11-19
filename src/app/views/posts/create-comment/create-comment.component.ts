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
  replys!: Comment[];
  replyOnComment!: Comment[];
  displayComments!: Comment[];
  profile: Profile = {};
  isWriter: boolean = false;
  isReply: boolean = false;
  commentData: Comment = {};
  commentWriter: Profile = {};
  commentLocaleDate: string = "";
  previous: Comment ={};

  constructor(
    public commentService: CommentService, 
    public activeModal: NgbActiveModal
    ) {}

  ngOnInit(): void {

    var modaled = document.querySelector('.modal-content');
    modaled?.setAttribute("style","border-radius:30px;");

    this.getOriginCommentsByPsid();
    
    let sessionProfile = sessionStorage.getItem("profile");
    if(sessionProfile!=null){
      this.profile = JSON.parse(sessionProfile);
    } 
  }

  deleteCommentByCid(cid?: number){
    if(cid){
      this.commentService.deleteCommentByCid(cid).subscribe(
        (result)=>{
          console.log(result);
          this.getOriginCommentsByPsid();
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
  

  getOriginCommentsByPsid(){
    if(this.post.psid){
      this.commentService.getCommentsByPsid(this.post.psid).subscribe(
        (result)=>{
          this.comments = result;
          this.comments = this.comments.filter(obj => obj.previous==null);
          this.getReplyComments();
        }
      )
    }  
  }

  getReplyComments(){
    if(this.post.psid){
      this.commentService.getCommentsByPsid(this.post.psid).subscribe(
        (result)=>{
          this.replys = result;
          this.replys = this.replys.filter(obj => obj.previous!=null)
          console.log(this.replys);
        }
      )
    }  
  }

  submitComment(comment: Comment){
    console.log(this.post);
    comment.post = this.post;
    comment.dateCreated = new Date();
    comment.writer = this.profile;
    this.commentService.createComment(comment).subscribe(
      (result)=>{
        this.isReply = false;
        this.getOriginCommentsByPsid();
        comment.cbody = "";
      }
    )
  }

  replyComment(comment: Comment){
    console.log(this.post);
    comment.post = this.post;
    comment.dateCreated = new Date();
    comment.previous = this.previous;
    comment.writer = this.profile;
    this.commentService.createComment(comment).subscribe(
      (result)=>{
        this.isReply = false;
        this.getOriginCommentsByPsid();
      }
    )
  }

  submitCommentOnComment(comment: Comment){
 
    this.previous = comment;
    this.isReply = true;
    this.getOriginCommentsByPsid();
  }
}
