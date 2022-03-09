import { Profile } from './../../../models/profile';
import { Post } from 'app/models/post';
import { PostService } from 'app/services/post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'app/services/profile.service';
import { FollowService } from 'app/services/follow.service';
import { faCameraRetro, faUserPlus, faUserMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css']
})
export class ProfileHeaderComponent implements OnInit {

  // Font Awesome Icons
  faCameraRetro = faCameraRetro;
  faUserPlus = faUserPlus;
  faUserMinus = faUserMinus;


  constructor(private profileService: ProfileService , private route: ActivatedRoute ,
    private  postService : PostService , private router: Router  , private followService:FollowService) { }


  profile : Profile | any;
  followersProfiles : Profile[] | any;
  id : any ;
  sessionId : any;
  firstName: any = "";
  lastName: any = "";
  email: any ;
  username : any = "username";
  url : any  =  `../../../../assets/favicon.png`;
  cover: any = `../../../../assets/favicon.png`;
  posts :any[] =[] ;
  profilePosts : Post[] =[];


  failed: boolean = false;
  success: boolean = false;
  followed : boolean = false;





  async ngOnInit(): Promise<void>  {
    this.id = this.route.snapshot.paramMap.get('id');
    let sessionProfile : any = sessionStorage.getItem("profile");

    sessionProfile = JSON.parse(sessionProfile);
    this.sessionId = sessionProfile.pid;

   this.profile = this.profileService.getProfileByPid(this.id).subscribe( (e : any) =>{
    this.followersProfiles = e.following;
    this.id = e.pid;
    this.firstName =e.firstName;
    this.lastName = e.lastName;
    this.email= e.email;
    this.url  = e.imgurl ?  e.imgurl : `../../../../assets/favicon.png` ;
    this.username = e.username;
    this.cover = e.coverimgurl||this.cover;

    });


    sessionProfile.following.forEach((e : Profile) => {

      if(  e.pid == this.id){
    this.followed = true
   }

  });

  }



follow() {

    this.followService.followUserByEmail(this.email , this.sessionId).subscribe(
      r => { this.success = true  ;
        console.log(this.email);
        console.log(r);

        this.followed = true},
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
