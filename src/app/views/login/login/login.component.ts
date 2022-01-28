import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from '../../../models/profile';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginProfile: Profile = {};

  username: string = "";
  password: string = "";

  error: boolean = false;
  missing: boolean = false;

  constructor(private profileService:ProfileService, private router: Router) {
  }

  login(){
    //Resetting all the error divs
    this.error = false;
    this.missing = false;

    //Check both field if there's value
    if(this.username != "" && this.password!= "")
    {
      this.profileService.login(this.username, this.password).subscribe(
        r => {
          if (r.body !== null && r.headers.get("Authorization") !== null)
          {

            const temp = r.body as Profile;

            this.loginProfile = r.body;

            console.log(this.loginProfile)

            this.profileService.setData(r.body);

            console.log(this.profileService.getProfile());




            sessionStorage.clear();
            const tempAuth = r.headers.get("Authorization");
            if (tempAuth !== null) {
              sessionStorage.setItem("Authorization", tempAuth);
            }
            sessionStorage.setItem("profile", JSON.stringify(temp));
            //Store the return body into sessionStorage and then redirect to profile page
            this.router.navigate(['/home']);
          } else {
            //Error in case if something in the backend doesn't give us data for w.e reason.
            console.log("Returned profile but no data");
          }
        },
        (error) => {
          console.log(error);
          this.error = true;
        }
      )
    } else { //If one of the field is empty missing div shows up
      this.missing = true;
    }
  }

}
