import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FollowService } from 'app/services/follow.service';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {

  email: string = "";

  error: boolean = false;
  missing: boolean = false;
  success: boolean = false;

  constructor(private followService:FollowService, private router:Router) { }

  ngOnInit(): void { }

  follow()
  {
    this.error = false;
    this.missing = false;

    // check if the email field is null
    if (this.email != "")
    {
      console.log("Email entered: ", this.email);
      this.followService.followUserByEmail(this.email).subscribe
      (
        r =>
        {
          if (r.body !== null)
          {
            // this would mean we successfully followed?
            this.success = true;
          }
          else
          {
            this.error = true;
          }
        }
      )
    } else { this.missing = true; }
  }
}
