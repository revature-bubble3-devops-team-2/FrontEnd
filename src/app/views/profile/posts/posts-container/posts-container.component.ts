import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreatePostComponent } from '../create-post/create-post.component';

@Component({
  selector: 'app-posts-container',
  templateUrl: './posts-container.component.html',
  styleUrls: ['./posts-container.component.css']
})
export class PostsContainerComponent implements OnInit {
  constructor(private createPostModal: NgbModal) { }

  ngOnInit(): void {
  }

  openCreatePost() {
    this.createPostModal.open(CreatePostComponent);
  }

}
