import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'app/models/post';
import { PostService } from 'app/services/post.service';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {

  public num!: number;
  public hasLiked!: boolean;

  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  
  @Input()
  postInfo!: Post;

  constructor(public postService: PostService) { }

  public getLikes(){
    this.postService.getNumLikes(this.postInfo).subscribe((data) => {
      console.log(data);
      this.num = data;
    });
  }

  public likePost() {
    this.postService.postLike(this.postInfo).subscribe((data) => {
        this.getLikes();
        }, (err) => {
          this.postService.deleteLike(this.postInfo).subscribe((data) => {
            this.getLikes();
          })
        })
        this.hasLiked = !this.hasLiked;
        console.log(this.hasLiked);
  }


  ngOnInit(): void {
    this.getLikes();
    this.postService.getLiked(this.postInfo).subscribe((data) => {
      if(data === 0) {
        this.hasLiked = false;
      } else {
        this.hasLiked = true;
      }
    })
  }

}
