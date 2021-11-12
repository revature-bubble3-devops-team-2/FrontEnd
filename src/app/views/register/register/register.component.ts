import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'app/services/profile.service';
import { Profile } from 'app/models/profile';
import { Router } from '@angular/router';

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

  constructor(private profileService:ProfileService, private router: Router) { }

  ngOnInit(): void {
  }

  // First checks if all fields are not empty, then checks if passwords
  // match, and finally calls the profile service to use the register profile
  // method.

  registerProfile(){
    this.taken = false;
    this.missing = false;
    this.pswMatch = false;
    this.success = false;

    if(this.firstname != "" && this.lastname != "" && this.email != "" && this.psw != "" && this.pswrepeat != "" && this.username != ""){
      
      if(this.psw==this.pswrepeat){
        this.profile.firstName = this.firstname;
        this.profile.lastName = this.lastname;
        this.profile.email = this.email;
        this.profile.username = this.username;
        this.profile.passkey = this.psw;

        this.profileService.registerProfile(this.profile).subscribe(
          (data) => {
            sessionStorage.setItem("Authorization", data.headers.get("Authorization"));
            this.router.navigate(['/profile']);
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
