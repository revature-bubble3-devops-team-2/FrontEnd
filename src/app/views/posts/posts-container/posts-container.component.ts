import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts-container',
  templateUrl: './posts-container.component.html',
  styleUrls: ['./posts-container.component.css']
})
export class PostsContainerComponent implements OnInit {

  posts!: Post[];

  public getAllPosts() {
    this.postService.getAllPosts().subscribe(response => this.posts = response);
  }

  constructor(public postService: PostService) { }

  ngOnInit(): void {
    this.getAllPosts();
  }

}
