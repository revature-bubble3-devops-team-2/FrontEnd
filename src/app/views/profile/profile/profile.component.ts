import { Component, OnInit } from '@angular/core';
import { Profile } from 'app/models/profile';
import { ProfileService } from 'app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: Profile = {};

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {

    this.profileService.getProfileByPid(1).subscribe(
      (result)=>{
        console.log(result);
      }
    )
  }

}
