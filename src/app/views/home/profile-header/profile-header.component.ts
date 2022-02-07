import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'app/services/profile.service';
import { faCameraRetro, faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css']
})
export class ProfileHeaderComponent implements OnInit {

  // Font Awesome Icons
  faCameraRetro = faCameraRetro;
  faUserPlus = faUserPlus;

  // Get icon
  id = 0;
  url: any = this.profileService.getProfile().imgurl
  ? this.profileService.getProfile().imgurl
  : `../../../../assets/favicon.png`;
  session: any;

  constructor(private profileService: ProfileService) { }


  get profile() {
    let sessionProfile = sessionStorage.getItem('profile');
    if (sessionProfile != null) {
      return JSON.parse(sessionProfile);
    }
  }

  ngOnInit(): void {
    let sessionProfile: any = sessionStorage.getItem('profile');
    this.session = JSON.parse(sessionProfile);
    this.url = this.session.imgurl
      ? this.session.imgurl
      : `../../../../assets/favicon.png`;
    this.id = this.session.pid;
  }

}
