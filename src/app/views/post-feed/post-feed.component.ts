import { Component, OnInit } from '@angular/core';
import { Post } from 'app/models/post';
import { PostService } from 'app/services/post.service';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css']
})
export class PostFeedComponent implements OnInit {

  posts: Post[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getFollowerPosts();
  }

  getFollowerPosts():void{
    this.postService.getPostsByFollowers();
    this.postService.getFollowerPosts().subscribe(
      (result)=>this.posts  = result as Post[]
    )
  }

}
