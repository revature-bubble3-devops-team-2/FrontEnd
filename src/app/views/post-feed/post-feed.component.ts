import { Component, OnInit } from '@angular/core';
import { Post } from 'app/models/post';
import { PostService } from 'app/services/post.service';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css'],
})
export class PostFeedComponent implements OnInit {
  posts: Post[] = [];
  loading = false;

  faThumbsUp = faThumbsUp;
  faComment = faComment;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.getFollowerPosts();
  }

  getFollowerPosts(): any {
    this.postService.getPostsByFollowers();
    this.postService.getFollowerPosts().subscribe(async (data: any) => {
      console.log(data);
      this.posts = (await data) as Post[];
      // this.posts.sort((a: Post, b: Post) => {
      //   let as = new Date(a.datePosted).getTime();
      //   let bs = new Date(b.datePosted).getTime();
      //   return bs - as;
      // });
    });
  }

  onScroll() {
    console.log('scrolled!!');
    this.loading = true;
  }
}
