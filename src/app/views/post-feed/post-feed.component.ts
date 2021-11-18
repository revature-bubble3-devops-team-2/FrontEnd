import { Component, OnInit } from '@angular/core';
import { Post } from 'app/models/post';
import { PostService } from 'app/services/post.service';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { updateFor } from 'typescript';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css']
})
export class PostFeedComponent implements OnInit {

  posts: Post[] = [];
  scrollcount = 1;

  faThumbsUp = faThumbsUp;
  faComment = faComment;
  Loading = false;
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getFollowerPosts(this.scrollcount);
  }


  getFollowerPosts(scrollcount: number):any{
    this.postService.getPostsByFollowers(scrollcount);
    this.postService.getFollowerPosts().subscribe(async (data: any) => {
      console.log(data)
      console.log(scrollcount);
      if(data !== null)
      {
      this.posts = await (data) as Post[];
      console.log(this.posts);
      }
      
      this.posts.sort((a: Post, b: Post) => {
        let as =  new Date(a.datePosted).getTime();
        let bs =  new Date(b.datePosted).getTime();
        return bs - as;
      })
    })
  }
  onScroll() {
    console.log('scrolled!!');
    this.Loading = true;
    this.getFollowerPosts(this.scrollcount++);



  }
  
  }


