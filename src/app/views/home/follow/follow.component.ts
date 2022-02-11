import { Component } from '@angular/core';
import { FollowService } from 'app/services/follow.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent {

  email: string = "";
  error: boolean = false;
  missing: boolean = false;
  success: boolean = false;
  successUnfollow: boolean = false;


  constructor(private followService:FollowService, private router:Router) { }
   sessionProfile : any = sessionStorage.getItem("profile");
   sessionId  = JSON.parse(this.sessionProfile).pid;

   //  sessionId : any =this.sessionProfile.pid;


  follow() {
    this.error = false;
    this.missing = false;
    this.success = false;
    this.successUnfollow = false;

    if (this.email !== "") {
      this.followService.followUserByEmail(this.email , this.sessionId).subscribe(
        r => this.success = true,
        err => this.error = true
      );
    }
    else { this.missing = true; }
  }

  unfollow() {
    this.error = false;
    this.missing = false;
    this.success = false;
    this.successUnfollow = false;

    if (this.email != "")
    {
      console.log("Email entered: ", this.email);
      this.followService.unfollowUserByEmail(this.email).subscribe(
      )
      this.successUnfollow = true;
    }
    else
    { this.missing = true; }
  }
}
