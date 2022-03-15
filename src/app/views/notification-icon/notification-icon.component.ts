import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notification-icon',
  templateUrl: './notification-icon.component.html',
  styleUrls: ['./notification-icon.component.css']
})
export class NotificationIconComponent implements OnInit {

  constructor(private router: Router){

  }

  //Need to grab data from database.
  hasNotification:boolean = false;
  session:any = {};
  id:number = 0;

  public showNotification() {

    if(this.hasNotification == true) {
      this.hasNotification = false;
    }
  }

  ngOnInit(): void {
    let sessionProfile : any = sessionStorage.getItem("profile");
    this.session = JSON.parse(sessionProfile);
    this.id = this.session.pid;
  }

// public showNotifications() {
//   this.router.navigate(["/group-page"]);
// }

}
