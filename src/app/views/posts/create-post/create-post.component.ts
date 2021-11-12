import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  addPost: Post = {
    creator: {
      pid: 2,
      username: 'profile3',
      passkey: '33',
      firstName: 'Three',
      lastName: 'LastThree',
      email: 'Email3',
    },
    body: '',
    datePosted: new Date(),
    imgURL: 'https://source.unsplash.com/random/300x300',
  };

 @Input() show: boolean=false;

  constructor(
    public postService: PostService, 
    public activeModal: NgbActiveModal
    ) {}

  ngOnInit(): void {}

  createPost() {
    if(this.addPost.body!==''){
    this.postService.createPost(this.addPost);
    this.activeModal.close();
    }else{
      this.show=true;
    }
  }
}
