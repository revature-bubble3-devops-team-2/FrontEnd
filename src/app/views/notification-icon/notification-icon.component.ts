import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/services/notification.service';
import { Notification } from 'app/models/notification';
import { Router } from '@angular/router';
import { interval } from 'rxjs';

@Component({
  selector: 'app-notification-icon',
  templateUrl: './notification-icon.component.html',
  styleUrls: ['./notification-icon.component.css']
})

export class NotificationIconComponent implements OnInit {

   hasNotification:boolean = false;
   session:any = {};
   id:number = 0;
   notifications: Notification[] = [];

  constructor(private notificationService: NotificationService, private router: Router){
  }

  ngOnInit(): void {
    let sessionProfile : any = sessionStorage.getItem("profile");
    this.session = JSON.parse(sessionProfile);
    this.id = this.session.pid;

    const notifyObs$ = interval(2000);
    notifyObs$.subscribe((n) => {
      this.toggleNotificationBtn();
    });

  }

  //if there's notifications, this toggles red dot notification
  public toggleNotificationBtn() {
    let sessionProfile : any = sessionStorage.getItem("profile");
    let sessionProfileObj = JSON.parse(sessionProfile);

    this.notificationService.getNotifications(sessionProfileObj.pid).subscribe((data) => {       
      this.notifications = data;
      this.hasNotification = false;
      for(let i = 0; i < data.length; i++) {
        if(data[i].read == false) {
          this.hasNotification = true;
        }
      }
    });
  }

  //this updates isRead = true & navigates to notification page
  public handleClick() {
    for(let i = 0; i < this.notifications.length; i++) {
      const currNotification = this.notifications[i];    
      this.notificationService.updateNotification(currNotification.nid, true).subscribe((data)=> {
      })
      this.router.navigateByUrl("/notification");
    }
  }

  // ngOnDestroy(): void {
  //   let sessionProfile : any = sessionStorage.getItem("profile");
  //   if(sessionProfile == null) {
  //     clearInterval();
  //   }
  // }
  
}
