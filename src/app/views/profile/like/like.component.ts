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

  @Input()
  postInfo!: Post;

  constructor(public postService: PostService) { }

  public getLikes(){
    this.postService.getNumLikes(this.postInfo).subscribe((data) => {
      this.num = data;});
  }

  public likePost() {
    
    this.postService.postLike(this.postInfo).subscribe((data) => {
      
        console.log(data);
        this.getLikes();
     
        })
  }

  public unlikePost() {
    this.postService.deleteLike(this.postInfo).subscribe((data) => {
            console.log("like deleted");
            this.getLikes();
          })
  }

  ngOnInit(): void {
    this.getLikes();
    
  }

}
