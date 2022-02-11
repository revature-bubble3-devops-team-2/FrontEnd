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

  loginPic: number = Math.floor(Math.random() * 3);

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
    const crypto = window.crypto;
    let array = new Uint32Array(1);
    crypto.getRandomValues(array);
    var enc = new TextDecoder("utf-8");
    enc.decode(array);
    console.log(`this is the array ${array}`)
    localStorage.setItem('randomCode',`${array}`);
    return `${environment.angUrl}/verify/email?randomCode=${array}&email=${this.email}`;
    }
  }
