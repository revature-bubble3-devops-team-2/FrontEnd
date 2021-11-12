import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-posts-container',
  templateUrl: './posts-container.component.html',
  styleUrls: ['./posts-container.component.css']
})
export class PostsContainerComponent implements OnInit {

  posts!: Post[];

  constructor(public postService: PostService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllPosts();
  }


  public getAllPosts() {
    this.postService.getAllPosts();
    this.postService.getPosts().subscribe(data => {
      this.posts = data as Post[];
    })
  }

  open(post: Post) {
    const modalRef = this.modalService.open(PostComponent);
    modalRef.componentInstance.post = post;
  }

}
