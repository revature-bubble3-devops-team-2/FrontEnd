import { FilterService } from './../../../services/filter.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from 'app/models/post';
import { Profile } from 'app/models/profile';
import { PostService } from 'app/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  profile: Profile = {};
  addPost: Post = {
    creator: {
      pid: this.profile.pid,
      username: this.profile.username,
      passkey: '',
      firstName: this.profile.firstName,
      lastName: this.profile.lastName,
      email: this.profile.email
    },
    body: '',
    datePosted: new Date(),
    imgURL: '',
  };

  @Input() show: boolean = false;

  constructor(
    public postService: PostService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private filterService: FilterService
    ) {}

  ngOnInit(): void {
    var sessionProfile = sessionStorage.getItem("profile");
    if(sessionProfile!=null){
      this.profile = JSON.parse(sessionProfile);
    }
  }

  ngOnDestroy(): void {
    window.location.href = '/home';
  }

  createPost() {
    if (this.addPost.body!=='') {
      //filter body for profanity
      this.addPost.body = this.filterService.filterProfanity(this.addPost.body);
      this.postService.createPost(this.addPost);
      this.activeModal.close();
    } else
    {
      this.show=true;
    }
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}
