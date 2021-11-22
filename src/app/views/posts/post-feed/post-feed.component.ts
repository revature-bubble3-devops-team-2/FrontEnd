import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from 'app/models/post';
import { PostService } from 'app/services/post.service';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Profile } from 'app/models/profile';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css'],
})
export class PostFeedComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  scrollcount = 1;
  profile: Profile = {};

  faThumbsUp = faThumbsUp;
  faComment = faComment;
  Loading!: boolean;
  endOfContents = false;

  private _unsubscribeAll = new Subject<any>();

  constructor(
    private postService: PostService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    let sessionProfile = sessionStorage.getItem('profile');
    if (sessionProfile != null) {
      this.profile = JSON.parse(sessionProfile);
    }

    this.getFollowerPosts(this.scrollcount);
  }

  getFollowerPosts(scrollcount: number): any {
    this.profile.pid = 241747610
    if (this.profile.pid) {
      this.postService.getPostsByFollowers(scrollcount, this.profile.pid);
      this.postService
        .getFollowerPosts()
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(async (data: any) => {
          if (data) {
            this.posts = (await data) as Post[];
          }
        });
    }
  }

  onScroll() {
    this.getFollowerPosts(++this.scrollcount);
  }

  open(post: Post) {
    const modalRef = this.modalService.open(PostComponent, {
      centered: true,
      modalDialogClass: 'postModal',
    });
    modalRef.componentInstance.post = post;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
