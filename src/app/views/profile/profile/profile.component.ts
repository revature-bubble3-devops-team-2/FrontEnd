import { Component, OnInit, OnChanges } from '@angular/core';
import { Profile } from 'app/models/profile';
import { ProfileService } from 'app/services/profile.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: Profile = {};
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
          //this.profile = result;
          sessionStorage.setItem("profile", JSON.stringify(result));
        }
      }
    )
    
    var sessionProfile = sessionStorage.getItem("profile");
    if(sessionProfile!=null){
      this.profile = JSON.parse(sessionProfile);
      //console.log(this.profile)
    }

    // if(this.profileService.getData()!={}){
    //   this.profile = this.profileService.getData();
    // }   
  }


  showUpdateMenu(){
    this.updated = true;
  }

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
  //   this.profileService.updateProfile(this.profile).subscribe(
  //     (result)=>{
  //       sessionStorage.setItem("profile", JSON.stringify(result));
  //       console.log(result);
  //     }
  //   )  
  // }

  leaveUpdate(){
    this.updated = false;
  }
}