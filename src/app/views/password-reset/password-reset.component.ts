import { ProfileService } from 'app/services/profile.service';
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
          localStorage.removeItem('randomCode');
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

  generateEmailUrl(token: string): any {
    const crypto = window.crypto;
    let array = new Uint32Array(1);
    crypto.getRandomValues(array);
    var enc = new TextDecoder("utf-8");
    enc.decode(array);
    localStorage.setItem('randomCode',`${array}`);
    return `${environment.angUrl}/email/verify/password?randomCode=${array}&email=${this.email}`;
    }
}
