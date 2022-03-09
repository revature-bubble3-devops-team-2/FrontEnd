import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Post } from 'app/models/post';
import { PostService } from 'app/services/post.service';
import { faSpinner, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faComment, faFrown, faBookmark} from '@fortawesome/free-regular-svg-icons';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Profile } from 'app/models/profile';
import { CreateCommentComponent } from '../create-comment/create-comment.component';


@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css'],
})
export class PostFeedComponent implements OnInit, OnDestroy {
  @Input()
    posts: Post[] = [];

  scrollcount = 1;
  profile: Profile = {};

  faThumbsUp = faThumbsUp;
  faComment = faComment;
  faFrown = faFrown;
  faSpinner = faSpinner;
  Loading!: boolean;
  endOfContents = false;
  faBookmark= faBookmark;

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

  }

  open(post: Post) {
    const modalRef = this.modalService.open(CreateCommentComponent, {
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
