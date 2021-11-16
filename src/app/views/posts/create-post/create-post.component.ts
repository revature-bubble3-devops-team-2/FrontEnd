import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from 'app/models/post';
import { PostService } from 'app/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  addPost: Post = {
    creator: {
      pid: 1
    },
    body: '',
    datePosted: new Date(),
    imgURL: 'https://source.unsplash.com/random/300x300',
  };

  constructor(
    public postService: PostService, 
    public activeModal: NgbActiveModal
    ) {}

  ngOnInit(): void {}

  createPost() {
    console.log(this.addPost);
    this.postService.createPost(this.addPost);
  }
}
