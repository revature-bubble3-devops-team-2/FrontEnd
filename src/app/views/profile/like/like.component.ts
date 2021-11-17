import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'app/models/post';
import { Profile } from 'app/models/profile';
import { PostService } from 'app/services/post.service';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {

  public num!: number;
  public hasLiked!: Boolean;
  
  @Input()
  postInfo!: Post;

  constructor(public postService: PostService) { }

  public getLikes(){
    this.postService.getNumLikes(this.postInfo).subscribe((data) => {
      this.num = data;});
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
