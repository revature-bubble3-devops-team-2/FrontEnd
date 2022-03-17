import { Post } from 'app/models/post';
import { PostService } from 'app/services/post.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  faComment,
  faFrown,
  faBookmark,
} from '@fortawesome/free-regular-svg-icons';
import { faSpinner, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Profile } from 'app/models/profile';
import { CreateCommentComponent } from 'app/views/posts/create-comment/create-comment.component';

@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.css'],
})

//for all purposes, a duplicated post feed component catered to bookmarks
export class BookmarkListComponent implements OnInit {
  @Input() posts!: Post[];
  @Input() text: string | any;

  scrollcount = 1;
  profile: Profile = {};

  faThumbsUp = faThumbsUp;
  faComment = faComment;
  faFrown = faFrown;
  faSpinner = faSpinner;
  Loading!: boolean;
  endOfContents = false;
  faBookmark = faBookmark;

  private _unsubscribeAll = new Subject<any>();

  constructor(
    public activeModal: NgbActiveModal,
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
