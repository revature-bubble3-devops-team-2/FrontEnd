import { Profile } from './../../../models/profile';
import { Post } from 'app/models/post';
import { PostService } from 'app/services/post.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'app/services/profile.service';
import { FollowService } from 'app/services/follow.service';
import { faCameraRetro, faUserPlus, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from 'app/services/notification.service';
import { FollowNotification } from 'app/models/follow-notification';

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

  @Input()
  profileInfo!: Profile;
  followNotification!: FollowNotification;


  constructor(private notificationService: NotificationService, private profileService: ProfileService , private route: ActivatedRoute ,
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
  sessionProfile : any;




  async ngOnInit(): Promise<void>  {
    this.id = this.route.snapshot.paramMap.get('id');
    this.sessionProfile = sessionStorage.getItem("profile");

    this.sessionProfile = JSON.parse(this.sessionProfile);
    this.sessionId = this.sessionProfile.pid;

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


    this.sessionProfile.following.forEach((e : Profile) => {

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

    let sessionProfile: any = sessionStorage.getItem("profile");
    const fromProfileId = JSON.parse(sessionProfile);
    this.profileService.getProfileByPid(this.id).subscribe(

      t => {
        const toProfileId = t;

        this.followNotification = {

          fromProfileId: {
            pid: fromProfileId.pid
          },
          toProfileId: {
            pid: toProfileId.pid
          },
          isRead: isRead
        }

          console.log(toProfileId);
          console.log(fromProfileId);
          this.notificationService.postFollowNotification(this.followNotification).subscribe((data) => {
            console.log(data);
          })
        },
      err => {
      console.error(err);
    }
    );

    const isRead = false;
  }



unfollow() {
    console.log("Email entered: ", this.email);
    this.followed = false;
    this.followService.unfollowUserByEmail(this.email).subscribe(
      e => this.followed = false,
      err => console.log(err)
    )
}

changeFile(file: any) {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
  });
}

onUpdateCover(event : any) {
  if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.changeFile(file).then((e: any): any => {
        this.sessionProfile.coverimgurl=e;
        this.sessionProfile.verification=true;
        this.profileService.updateProfile(this.sessionProfile).subscribe(d=> {
          console.log("here");
          sessionStorage.setItem("profile",JSON.stringify(d));
          this.cover = e;
        });
      });
  }
}
onUpdatePhoto(event : any) {
  if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.changeFile(file).then((e: any): any => {
        this.sessionProfile.imgurl=e;
        this.url = e;
        this.sessionProfile.verification=true;
        this.profileService.updateProfile(this.sessionProfile).subscribe(d=> {
          console.log("here");
          this.url = e;
          sessionStorage.setItem("profile",JSON.stringify(d));
          window.location.reload();
        });
      });
  }
}



}
