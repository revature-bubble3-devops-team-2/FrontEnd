import { Component, OnInit } from '@angular/core';
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
      console.log(this.profile)
    }   
  }

  showUpdateMenu(){
    this.updated = true;
  }

  updateProfile(){
    if(this.email!=""){
      this.profile.email = this.email;
    }
    if(this.firstName!=""){
      this.profile.firstName = this.firstName;
    }  
    if(this.lastName!=""){
      this.profile.lastName = this.lastName;
    }
    this.profile.pid = 1;
    this.profileService.updateProfile(this.profile).subscribe(
      (result)=>{
        console.log(result);
      }
    )  
  }
}
