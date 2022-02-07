import { PostService } from 'app/services/post.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'app/services/profile.service';
import { Router } from '@angular/router';
import { faHome, faUserFriends, faUsers, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faIdCard, faComments, faCalendar } from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private profileService: ProfileService , private httpClient : HttpClient  ,
    private router: Router  , private postService : PostService ) { }

  // Profile Info
  id : number =0;
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  updated: boolean = false;
  credential: string = "";
  key ="";
  session : any = {};
  url : any = this.session.imgurl ? this.session.imgurl : `../../../../assets/favicon.png`


    // Icons
    faHome = faHome;
    faIdCard = faIdCard;
    faUserFriends = faUserFriends;
    faUsers = faUsers;
    faComments = faComments;
    faCalendar = faCalendar;
    faCog = faCog;
    faSignOutAlt = faSignOutAlt;

    profileUrl = "/profileview/"+ this.id




  ngOnInit(): void {

    let sessionProfile : any = sessionStorage.getItem("profile");

    this.session = JSON.parse(sessionProfile);
    this.id = this.session.pid;
     this.profileService.getProfileByPid(this.id).subscribe( (e : any) =>{
      this.url  = e.imgurl ?  e.imgurl : `../../../../assets/favicon.png` ;
      this.profileService.getProfile().imgurl =  e.imgurl;
      });

  }



 get profile(){
    let sessionProfile = sessionStorage.getItem("profile");
    if(sessionProfile!=null){
     return JSON.parse(sessionProfile);
    }
  }

changeFile(file: any) {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
  });
}

/*
@autor update image team
*/

onSelectFile(event : any) {

  if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.changeFile(file).then((e: any): any => {
        this.profileService.setImhg(e)
        this.session.imgurl = e;
        this.url = e;

        // this.profileService.updateProfile(this.profileService.getProfile()).subscribe(d=> {
        //   this.profileService.getProfile().imgurl = d.imgurl ;
        //   this.url = d.imgurl;
        //   window.location.reload();
        // });

        // console.log(this.session);
        // console.log(this.profileService.getProfile())


        this.profileService.updateProfile(this.session).subscribe(d=> {
          this.session.imgurl = e;
          this.profileService.getProfile().imgurl = d.imgurl ;
          this.url = e;
          window.location.reload();
        });


      });
  }
}

public delete(){
  this.url = null;
}

public logout(){

  sessionStorage.clear();
  this.router.navigate(["/login"]);
}

goToprofile(){
  this.router.navigate(["/profileview/", this.id ]);
}


}
