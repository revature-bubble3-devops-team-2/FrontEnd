import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from 'app/models/post';
import { PostService } from 'app/services/post.service';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostComponent } from '../profile/posts/post/post.component';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css'],
})
export class PostFeedComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  scrollcount = 1;

  faThumbsUp = faThumbsUp;
  faComment = faComment;
  Loading!: boolean;
  endOfContents = false;

  private _unsubscribeAll = new Subject<any>();
  
  constructor(private postService: PostService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getFollowerPosts(this.scrollcount);
  }


  getFollowerPosts(scrollcount: number):any{
    this.postService.getPostsByFollowers(scrollcount);
    this.postService.getFollowerPosts()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(async (data: any) => {
      if (data) {
        this.posts = await (data) as Post[];
      }
    })
  }


  onScroll() {
    this.getFollowerPosts(++this.scrollcount);
  }

  open(post: Post) {
    const modalRef = this.modalService.open(PostComponent);
    modalRef.componentInstance.post = post;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }


}


   // this.endOfContents = true;
      
      // this.posts.sort((a: Post, b: Post) => {
      //   let as =  new Date(a.datePosted).getTime();
      //   let bs =  new Date(b.datePosted).getTime();
      //   return bs - as;
      // })
