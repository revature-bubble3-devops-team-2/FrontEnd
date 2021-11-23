import { Component, OnInit } from '@angular/core';
import { Post } from 'app/models/post';
import { PostService } from 'app/services/post.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostComponent } from '../post/post.component';
import { CreatePostComponent } from '../create-post/create-post.component';
import { CreateCommentComponent } from '../create-comment/create-comment.component';

@Component({
  selector: 'app-posts-container',
  templateUrl: './posts-container.component.html',
  styleUrls: ['./posts-container.component.css']
})
export class PostsContainerComponent {
  constructor(private modalService: NgbModal) { }

  openCreatePost() {
    this.modalService.open(CreatePostComponent, {
      modalDialogClass: 'createPostModal'
    });
  }

  open(post: Post) {
    const modalRef = this.modalService.open(PostComponent);
    modalRef.componentInstance.post = post;
  }

  createComment(post: Post) {
    const modalRef = this.modalService.open(CreateCommentComponent);
    modalRef.componentInstance.post = post;
  }
}
