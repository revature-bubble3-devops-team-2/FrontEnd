import { ProfileService } from 'app/services/profile.service';
import { RegisterComponent } from './../register/register/register.component';
import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { EmailModel } from 'app/models/email-mod';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {


  //profile: Profile = {};
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

  constructor(private profileService: ProfileService, private route: ActivatedRoute, private router: Router) { }

  randomCode?: string;
  ngOnInit(): void {

    this.route.queryParams
    .subscribe(params => {
      console.log(params);
      this.randomCode = params.randomCode;
      this.email = params.email;
      console.log(this.randomCode);

      if(!!this.randomCode){
        if( localStorage.getItem("randomCode") == this.randomCode){
          this.emailVerified = true;
          //localStorage.removeItem('randomCode');
          this.updatePassword();
        }
      }

    console.log(this.route.url);
  })
 }


  updatePassword(){

    if(this.psw == "" || this.pswrepeat == ""){
      this.missing = true;
    }
    else if(this.psw !== this.pswrepeat){
      this.missing = false;
      this.pswMatch = true;
    }
    else{
      this.missing = false;
      this.profileService.getProfileByEmailAndUpdatePassword(this.email, this.psw).subscribe(
        (data) => {
          console.log(data.body);
          this.success = true;

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        }
      );

    }
    
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
    return `${environment.angUrl}/email/verify/password?randomCode=${randCode}&email=${this.email}`;
    }

  }

}
