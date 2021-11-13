import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Profile } from '../../../models/profile';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginProfile: Profile = {};

  username: string = "";
  password: string = "";

  error: boolean = false;
  missing: boolean = false;

  constructor(private profileService:ProfileService, private router: Router) { 
  }

  ngOnInit(): void {
    
  }

  login(){
    //Resetting all the error divs
    this.error = false;
    this.missing = false;

    //Check both field if there's value
    if(this.username != "" && this.password!= "")
    {
      console.log("test", this.username, this.password);
      this.profileService.login(this.username, this.password).subscribe(
        r => { 
          console.log(r);

          
          if (r.headers.get("Authorization") !== null)
          {
            let headerVar =r.headers.get("Authorization");
            console.log(headerVar);
            /*headerVar = r.headers.get("Authorization");
            sessionStorage.setItem("Authorization", headerVar);*/
          }
          
          this.router.navigate(['/profile']);
        }
      )


    } else { //If one of the field is empty missing div shows up
      this.missing = true;
    }
  }

}
