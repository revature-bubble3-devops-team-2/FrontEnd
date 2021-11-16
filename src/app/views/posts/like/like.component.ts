import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'app/models/post';
import { PostService } from 'app/services/post.service';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {

  public num!: number;

  @Input()
  postInfo!: Post;

  constructor(public postService: PostService) { }

  public getLikes(){
    this.postService.getNumLikes(this.postInfo).subscribe((data: any) => {
      this.num = data;});
  }

  public likePost() {
    this.postService.postLike(this.postInfo).subscribe((data: any) => {
      console.log(data);
      this.getLikes();
    })
  }

  ngOnInit(): void {
    this.getLikes();
  }

}
