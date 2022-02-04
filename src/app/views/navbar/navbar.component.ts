import { PostService } from 'app/services/post.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'app/services/profile.service';
import { Router  } from '@angular/router';
import { faHome, faUserFriends, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faIdCard, faComments } from '@fortawesome/free-regular-svg-icons';
import {Routes , RouterModule  } from '@angular/router';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // Profile Info
  id : number =0;
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  updated: boolean = false;
  credential: string = "";
  key ="";
  url : any = this.profileService.getProfile().imgurl  ?  this.profileService.getProfile().imgurl :  `../../../../assets/favicon.png` ;
  session : any ;

    // Icons
    faHome = faHome;
    faIdCard = faIdCard;
    faUserFriends = faUserFriends;
    faUsers = faUsers;
    faComments = faComments;

    profileUrl = "/profileview/"+ this.id




  ngOnInit(): void {

    let sessionProfile : any = sessionStorage.getItem("profile");

    this.session = JSON.parse(sessionProfile);
    console.log(this.session);
    this.url = this.session.imgurl ? this.session.imgurl : `../../../../assets/favicon.png` ;
    this.id = this.session.pid;
  }

  constructor(private profileService: ProfileService , private httpClient : HttpClient  ,
    private router: Router  , private postService : PostService ) { }

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
        this.url = e;
        this.profileService.updateProfile(this.profileService.getProfile()).subscribe(d=> console.log(d))
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
