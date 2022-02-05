import { ProfileService } from 'app/services/profile.service';
import { RegisterComponent } from './../register/register/register.component';
import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { EmailModel } from 'app/models/email-mod';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {


  //profile: Profile = {};
  firstname: string = "";
  lastname: string = "";
  email: string = "";
  username: string = "";
  psw: string = "";
  pswrepeat: string = "";
  emailmod:EmailModel= {};


  emailSent: boolean = false;
  taken: boolean = true;
  missing: boolean = false;
  pswMatch: boolean = false;
  success: boolean = false;
  emailVerified: boolean = false;

  constructor(private profileService: ProfileService, private router: Router) { }

  ngOnInit(): void {

    console.log(this.router.url);
  }


  updatePassword(){

  }

  verifyEmail(){

    if(this.email == ""){
      this.missing = true;
    }
    else{


      this.emailmod.url = this.generateEmailUrl("email");
      this.emailmod.email = this.email;
      console.log(this.emailmod);
      this.profileService.verifyEmailForPasswordUpdate(this.emailmod).subscribe(
        (data: any) => {
          console.log(data)
          this.emailSent = true;
        },(error: Error) => {
          console.log(error);
        }
      );

    }

  }

  routeToResetPassword(){

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
    return `${environment.angUrl}/email/verified/updatepassword?randomCode=${randCode}&email=${this.email}`;
    }

  }

}
