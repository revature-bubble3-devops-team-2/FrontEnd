import { Post } from 'app/models/post';
import { PostService } from 'app/services/post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'app/services/profile.service';
import { FollowService } from 'app/services/follow.service';
import {Routes , RouterModule  } from '@angular/router';


@Component({
  selector: 'app-profileview',
  templateUrl: './profileview.component.html',
  styleUrls: ['./profileview.component.css']
})
export class ProfileviewComponent implements OnInit {

  constructor(private profileService: ProfileService , private route: ActivatedRoute ,
    private  postService : PostService , private router: Router  , private followService:FollowService) { }


  profile : any;
  id : any ;
  firstName: any ;
  lastName: any ;
  email: any ;
  username : any;


  url : any ;

  posts :any[] =[] ;
  profilePosts : Post[] =[];


  failed: boolean = false;
  success: boolean = false;
  followed : boolean = false;
  // successUnfollow: boolean = false;




  async ngOnInit(): Promise<void>  {
    this.id = this.route.snapshot.paramMap.get('id');
    let sessionProfile : any = sessionStorage.getItem("profile");

    console.log(sessionProfile);


   this.profile = this.profileService.getProfileByPid(this.id).subscribe( (e : any) =>{
     console.log(e);
    this.id = e.pid;
    this.firstName =e.firstName;
    this.lastName = e.lastName;
    this.email= e.email;
    this.url  = e.imgurl ?  e.imgurl : `../../../../assets/favicon.png` ;
    this.username = e.username;
    this.getFollowerPosts(1);

    // console.log("===========================================")
    // this.profileService.getPosts(e.pid).subscribe(e=> console.log(e))
    // console.log("===========================================")


    });



  }


  getFollowerPosts(scrollcount: number): any {
    this.postService.getPostsByFollowers(scrollcount);
    this.postService
      .getFollowerPosts()
      .subscribe( (data: any) => {
        if (data) {
          this.posts = data;

          this.profilePosts =this.posts.filter((p:Post)=> p.creator.pid == this.id);
        }
      });



}
goBack(){
  this.router.navigate(['/home']);
}


follow() {

  console.log(this.email , this.followed )

    this.followService.followUserByEmail(this.email).subscribe(
      r => { this.success = true  ; this.followed = true},
      err => this.failed = true
    );
}


unfollow() {
    console.log("Email entered: ", this.email);
    this.followed = false;
    this.followService.unfollowUserByEmail(this.email).subscribe(
      e => this.followed = false,
      err => console.log(err)
    )
}


}
