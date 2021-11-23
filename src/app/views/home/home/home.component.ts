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
    // if (this.profile !== null) {
    //   if (this.profile.pid) {
        this.postService.getPostsByFollowers(scrollcount, 2);
        this.postService
          .getFollowerPosts()
          //.pipe(takeUntil(this._unsubscribeAll))
          .subscribe(async (data: any) => {
            if (data) {
              console.log("Hello: "+data);
              this.posts = (await data) as Post[];
            }
          });
    //   }
    // }
  }

  onScroll() {
    this.getFollowerPosts(++this.scrollcount);
  }
}
