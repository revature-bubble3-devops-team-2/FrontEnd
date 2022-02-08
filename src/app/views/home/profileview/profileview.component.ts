import { Profile } from './../../../models/profile';
import { Post } from 'app/models/post';
import { PostService } from 'app/services/post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'app/services/profile.service';
import { FollowService } from 'app/services/follow.service';


@Component({
  selector: 'app-profileview',
  templateUrl: './profileview.component.html',
  styleUrls: ['./profileview.component.css']
})
export class ProfileviewComponent implements OnInit {

  constructor(private profileService: ProfileService , private route: ActivatedRoute ,
    private  postService : PostService , private router: Router  , private followService:FollowService) { }


  profile : Profile | any;
  followersProfiles : Profile[] | any;
  followersOfThisUser : Profile[] | any;
  id : any ;
  sessionId : any;
  firstName: any ;
  lastName: any ;
  email: any ;
  username : any;
  url : any  =  `../../../../assets/favicon.png`;
  posts :any[] =[] ;
  profilePosts : Post[] =[];


  failed: boolean = false;
  success: boolean = false;
  followed : boolean = false;

  //Tabs
  showPosts: boolean = true;
  showFollowers: boolean = false;
  showFollowing : boolean = false;



  async ngOnInit(): Promise<void>  {
    this.id = this.route.snapshot.paramMap.get('id');
    let sessionProfile : any = sessionStorage.getItem("profile");
    sessionProfile = JSON.parse(sessionProfile);
    this.sessionId = sessionProfile.pid;



    this.profileService.getFollowers(this.id).subscribe(e => {
      this.followersOfThisUser = e;
    })


   this.profile = this.profileService.getProfileByPid(this.id).subscribe( (e : any) =>{
    this.followersProfiles = e.following;
    console.log(this.followersProfiles);
    this.id = e.pid;
    this.firstName =e.firstName;
    this.lastName = e.lastName;
    this.email= e.email;
    this.url  = e.imgurl ?  e.imgurl : `../../../../assets/favicon.png` ;
    this.username = e.username;
    this.getFollowerPosts(1);
    sessionProfile.following.forEach((e : Profile) => {

        if(  e.pid == this.id){
      this.followed = true
     }

    });


    });

  }


  getFollowerPosts(scrollcount: number): any {

      this.postService
      .getAllPosts()
      .subscribe( (data: any) => {



        if (data) {
          this.posts = data;
          console.log( this.posts)
          this.profilePosts =this.posts.filter((p:Post)=>{
           return  p.creator.pid == this.id });
        }
      });

}



goBack(){
  this.router.navigate(['/home']);
}


follow() {

  console.log(this.email , this.followed )

    this.followService.followUserByEmail(this.email , this.sessionId).subscribe(
      r => { this.success = true  ;
        console.log(this.email);
        console.log(r);

        this.followed = true  },
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

toggleViewTabs(){
  if(this.showPosts){
    this.showPosts = false;
    this.showFollowing = false;
    this.showFollowers = true;
  } else if(this.showFollowing){
    this.showPosts = true;
    this.showFollowers = true;
    this.showFollowing = false;
  }
  else {
    this.showPosts = true;
    this.showFollowers = false;
    this.showFollowing = false;
  }
}

}
