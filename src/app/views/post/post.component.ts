import { Component, OnInit } from '@angular/core';
import { Post } from 'app/models/post';
import { PostService } from 'app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  postArray:Post[]=[];
  onePost:Post = {};
  username?:string = "";
  imgURL?:string = "";
  body?:string = "";
  datePosted?:string = "";


  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(
      (result)=>{
        console.log(result);
        this.postArray = result;
        this.onePost = this.postArray[0];
        console.log(this.onePost.creator?.username);
        this.username = this.onePost.creator?.username;
        this.imgURL = this.onePost.imgURL;
        this.body = this.onePost.body;
        this.datePosted = this.postService.convertTransactionTime(Number(this.onePost.datePosted));
      }
    )
  }

}
