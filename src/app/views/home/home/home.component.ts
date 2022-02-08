import { Component, OnInit } from '@angular/core';
import { Post } from 'app/models/post';
import { Profile } from 'app/models/profile';
import { PostService } from 'app/services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public postService: PostService , private router: Router) { }

  posts!: Post[];
  scrollcount: number = 1;
  profile = sessionStorage.getItem("profile") as Profile;

  logout(): void {
    sessionStorage.clear();
  }

  async ngOnInit(): Promise<void> {
    await this.getFollowerPosts(this.scrollcount);
  }


  getFollowerPosts(scrollcount: number): any {
    this.postService.getPostsByFollowers(scrollcount);
    this.postService
      .getFollowerPosts()
      .subscribe(async (data: any) => {
        if (data) {
          this.posts = (await data) as Post[];
          console.log(data);
          this.postService.setPosts(data)
          console.log( this.postService.sessionPosts);

        }
      });
  }



  onScroll() {
    this.getFollowerPosts(++this.scrollcount);
  }
  showMore(){
    this.getFollowerPosts(++this.scrollcount);
  }
}
