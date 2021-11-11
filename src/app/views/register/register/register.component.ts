import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'app/services/profile.service';
import { Profile } from 'app/models/profile';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  profile: Profile = {};
  firstname: string = "";
  lastname: string = "";
  email: string = "";
  username: string = "";
  psw: string = "";
  pswrepeat: string = "";

  taken: boolean = false;
  missing: boolean = false;
  pswMatch: boolean = false;
  success: boolean = false;

  constructor(private profileService:ProfileService) { }

  ngOnInit(): void {
  }

  registerProfile(){
    if(this.firstname != "" && this.lastname != "" && this.email != "" && this.psw != "" && this.pswrepeat != "" && this.username != ""){
      
      if(this.psw==this.pswrepeat){
        this.profile.firstName = this.firstname;
        this.profile.lastName = this.lastname;
        this.profile.email = this.email;
        this.profile.username = this.username;
        this.profile.passkey = this.psw;

        this.profileService.registerProfile(this.profile).subscribe(
          (data) => {
            this.success = true;
          },
          (error) => {
            this.taken = true;
          }
        )
      }
      else{
        this.pswMatch = true;
      }
    } 
    else{
      this.missing = true;
    }
  }
}
