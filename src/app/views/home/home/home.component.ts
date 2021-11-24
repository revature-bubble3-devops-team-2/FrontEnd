import { Component, OnInit } from '@angular/core';
import { Post } from 'app/models/post';
import { Profile } from 'app/models/profile';
import { PostService } from 'app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public postService: PostService) { }

  posts!: Post[];
  scrollcount: number = 1;
  profile = sessionStorage.getItem("profile") as Profile;
  
  logout(): void {
    sessionStorage.clear();
  }

  async ngOnInit(): Promise<void> {
    await this.getFollowerPosts(this.scrollcount);
    console.log(this.profile);
  }

  getFollowerPosts(scrollcount: number): any {
    this.postService.getPostsByFollowers(scrollcount);
    this.postService
      .getFollowerPosts()
      .subscribe(async (data: any) => {
        if (data) {
          this.posts = (await data) as Post[];
        }
      });
  }

  onScroll() {
    this.getFollowerPosts(++this.scrollcount);
  }
}
