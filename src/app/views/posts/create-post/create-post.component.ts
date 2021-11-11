import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  addPost: Post = {
    creator: {
        "pid":2,
        "username":"profile2",
        "passkey":"22",
        "firstName":"Two",
        "lastName":"LastTwo",
        "email":"Email2"
  }
  ,
    body: "",
    datePosted: new Date(),
    imgURL: ""
  };

  createPost() {
    console.log(`creating post: ${this.addPost} `);
    this.postService.createPost(this.addPost).subscribe(response=> console.log(response));

  }
  
  

  constructor(public postService: PostService) { }

  ngOnInit(): void {
  }

}
