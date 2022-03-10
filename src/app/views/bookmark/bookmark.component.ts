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
  posts: Post[] = [];

  public createBookmark() {
    this.bookmarkService.postBookmark(this.postInfo).subscribe(
      (data) => {
        //add bookmark to posts array
        this.posts.push(data);
        console.log(data);
      },
      (err) => {
        this.bookmarkService.deleteBookmark(this.postInfo).subscribe((data) => {
          console.log(data);
        });
      }
    );
    this.hasBookmark = !this.hasBookmark;
  }

  public getBookmarks(){
    this.bookmarkService.getBookmarks(this.posts).subscribe((data) => {
      console.log(data);
    });
  }

  constructor(
    public bookmarkService: BookmarkService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal) {}

  ngOnInit(): void {}
}
