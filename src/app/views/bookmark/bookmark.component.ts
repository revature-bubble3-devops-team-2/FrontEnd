import { Component, OnInit } from '@angular/core';
import { faBookmark as faBookmarkSolid} from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkOutline} from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {

  faBookmarkSolid = faBookmarkSolid;
  faBookmarkOutline = faBookmarkOutline;

  constructor() { }

  ngOnInit(): void {
  }

}
