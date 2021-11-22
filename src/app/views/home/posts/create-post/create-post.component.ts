import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
      pid: 2,
      username: 'profile3',
      passkey: '33',
      firstName: 'Three',
      lastName: 'LastThree',
      email: 'Email3',
    },
    body: '',
    datePosted: new Date(),
    imgURL: '',
  };

  @Input() show: boolean=false;

  constructor(
    public postService: PostService, 
    public activeModal: NgbActiveModal,
    private modalService: NgbModal
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

  closeModal() {
    this.modalService.dismissAll();
  }
}
