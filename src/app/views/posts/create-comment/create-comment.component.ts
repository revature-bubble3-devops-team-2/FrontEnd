import { Component, OnInit, Input, Renderer2 } from '@angular/core';
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
  reply: Comment={};
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
  replyDate: string = "";
  previous: Comment ={};

  constructor(
    public commentService: CommentService, 
    public activeModal: NgbActiveModal,
    private renderer: Renderer2
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

dateFormatForComment(d: Date) {
    if(d){
      var formattedDate = (d.getMonth() + 1)  + "-"  +d.getDate()+  "-"+ d.getFullYear() ;
      var hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
      var minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
      var formattedTime = hours + ":" + minutes;
      if(formattedDate)
        this.commentLocaleDate = formattedDate;
     }
  }

  dateFormatForReply(d: Date) {
    if(d){
      var formattedDate = (d.getMonth() + 1)  + "-"  +d.getDate()+  "-"+ d.getFullYear() ;
      var hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
      var minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
      var formattedTime = hours + ":" + minutes;
      if(formattedDate)
        this.replyDate = formattedDate;
     }
  }

  formatReplyDate(reply: Comment){
    var temp = reply.dateCreated;
    var d;
    if(temp){
      d = new Date(temp);
      this.dateFormatForReply(d);
    }
    return true;   
  }

  checkWriterForEachComment(comment: Comment){
    this.isWriter=false;
    this.commentData = comment;
    var temp = this.commentData.dateCreated;
    var d;
    if(temp){
      d = new Date(temp);
      this.dateFormatForComment(d);
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
          for(let r of this.replys){
          }
          this.replys = this.replys.filter(obj => obj.previous!=null)
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
        this.comment.cbody = "";
        this.getOriginCommentsByPsid();
      }
    )
  }

  submitReply(reply: Comment){
    reply.post = this.post;
    reply.dateCreated = new Date();
    reply.writer = this.profile;
    reply.previous = this.previous;
    this.commentService.createComment(reply).subscribe(
      (result)=>{
        this.isReply = false;
        //this.reply.cbody = "";
        this.getOriginCommentsByPsid(); 
      }
    )
  }


  submitCommentOnComment(comment: Comment){
    this.previous = comment;
    this.isReply = true;
    this.getOriginCommentsByPsid();
    this.renderer.selectRootElement('#create-comment').focus();
  }
}
