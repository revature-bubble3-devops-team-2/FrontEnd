import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'app/models/post';
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkOutline } from '@fortawesome/free-regular-svg-icons';
import { PostService } from 'app/services/post.service';
import { BookmarkService } from 'app/services/bookmark.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css'],
})
export class BookmarkComponent implements OnInit {
  public hasBookmark!: boolean;

  faBookmarkSolid = faBookmarkSolid;
  faBookmarkOutline = faBookmarkOutline;

  @Input()
  postInfo!: Post;
  bookmarkPosts: Post[] = [];
  
  public createBookmark() {
    console.log(this.postInfo)
    this.bookmarkService.postBookmark(this.postInfo).subscribe(
      (data) => {
        console.log(data);
        console.log(this.hasBookmark);
      },
      (err) => {
        this.bookmarkService.deleteBookmark(this.postInfo).subscribe((data) => {
          console.log(data);
          });
      }
    );
    this.hasBookmark = !this.hasBookmark;
  }

  constructor(
    public bookmarkService: BookmarkService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal) {}

  ngOnInit(): void {
    this.bookmarkService.getBookmarked(this.postInfo).subscribe((data) => {
    if(data === 0) {
      this.hasBookmark = false;
    } else {
      this.hasBookmark = true;}
    });
  }
}
