import { Component } from '@angular/core';
import { ProfileService } from 'app/services/profile.service';
import { faHome, faUserFriends, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faIdCard, faComments } from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  firstName: string = "";
  lastName: string = "";
  email: string = "";
  updated: boolean = false;
  credential: string = "";

  // Icons
  faHome = faHome;
  faIdCard = faIdCard;
  faUserFriends = faUserFriends;
  faUsers = faUsers;
  faComments = faComments;

  constructor(private profileService: ProfileService) { }

 get profile(){
    let sessionProfile = sessionStorage.getItem("profile");
    if(sessionProfile!=null){
     return JSON.parse(sessionProfile);
    }
  }
}
