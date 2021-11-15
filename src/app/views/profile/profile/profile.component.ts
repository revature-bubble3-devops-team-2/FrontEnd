import { Component, OnInit } from '@angular/core';
import { Profile } from 'app/models/profile';
import { ProfileService } from 'app/services/profile.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  firstName: string = "";
  lastName: string = "";
  email: string = "";
  updated: boolean = false;
  credential: string = "";

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
      this.profileService.getProfileByPid(1).subscribe(
      (result)=>{
        if(result){
          sessionStorage.setItem("profile", JSON.stringify(result));
        }
      }
    )
  }

 
  get profile(){
    let sessionProfile = sessionStorage.getItem("profile");
    if(sessionProfile!=null){
     return JSON.parse(sessionProfile);
    }
  }

  // showUpdateMenu(){
  //   this.updated = true;
  // }

  // updateProfile(){
  //   if(this.email!=""){
  //     this.profile.email = this.email;
  //   }
  //   if(this.firstName!=""){
  //     this.profile.firstName = this.firstName;
  //   }  
  //   if(this.lastName!=""){
  //     this.profile.lastName = this.lastName;
  //   }
  //   this.profile.pid = 1;
  //   this.profileService.updateProfile(this.profile).subscribe(
  //     (result)=>{
  //       console.log(result);
  //       this.updated = true;
  //     }
  //   )  
  // }

  // leaveUpdate(){
  //   this.updated = false;
  // }
}
