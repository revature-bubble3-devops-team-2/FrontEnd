import { EmailModel } from './../../../models/email-mod';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'app/services/profile.service';
import { Profile } from 'app/models/profile';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

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

  emailmod:EmailModel= {};

  taken: boolean = false;
  missing: boolean = false;
  pswMatch: boolean = false;
  success: boolean = false;

  constructor(private profileService:ProfileService, private router: Router) { }

  ngOnInit(): void {
    sessionStorage.clear();
  }

  // First checks if all fields are not empty, then checks if passwords
  // match, and finally calls the profile service to use the register profile
  // method.

  registerProfile(){
    this.taken = false;
    this.missing = false;
    this.pswMatch = false;
    this.success = false;
    let token = '';

    if(this.firstname != "" && this.lastname != "" && this.email != "" && this.psw != "" && this.pswrepeat != "" && this.username != ""){

      if(this.psw==this.pswrepeat){
        this.profile.firstName = this.firstname;
        this.profile.lastName = this.lastname;
        this.profile.email = this.email;
        this.profile.username = this.username;
        this.profile.passkey = this.psw;

        this.profileService.registerProfile(this.profile).subscribe(
          (data: any) => {
            const temp = data.body as Profile;
            // refactor from upload image team
            token = data.headers.get("Authorization");
            console.log( 'subscriber token: ' + token);
            this.profileService.setData(data.body);
            console.log(this.profileService.getProfile());
            sessionStorage.clear();
            this.emailmod.url = this.generateEmailUrl(token);
            this.emailmod.email = this.email;
            console.log(this.emailmod);
            this.profileService.verifyEmail(this.emailmod).subscribe(
              (data: any) => {
                console.log(data)
              },(error: Error) => {
                console.log(error);
              }
            );
            //sessionStorage.setItem("Authorization", token);
            //sessionStorage.setItem("profile", JSON.stringify(temp));
            this.router.navigate(['/login']);
          },
          (error: Error) => {
            console.log(error);
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
  generateEmailUrl(token: string): any {
    let tk = token;
    let randCode= '';
    console.log('token: '+tk)
    if(tk){
      for(var i =0; i < 40; i++){
     randCode+= tk.charAt(Math.floor(Math.random() * tk.length))
    }
    localStorage.setItem('randomCode',randCode);
    console.log(this.email)
    return `${environment.angUrl}/verify/email?randomCode=${randCode}&email=${this.email}`;
    }

  }
}
