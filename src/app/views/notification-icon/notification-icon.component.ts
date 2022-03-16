import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/services/notification.service';
import { Notification } from 'app/models/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification-icon',
  templateUrl: './notification-icon.component.html',
  styleUrls: ['./notification-icon.component.css']
})

export class NotificationIconComponent implements OnInit {

   //Need to grab data from database.
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
    this.showNotification();
  }

  public showNotification() {
    let sessionProfile : any = sessionStorage.getItem("profile");
    let sessionProfileObj = JSON.parse(sessionProfile);
    this.notificationService.getNotifications(sessionProfileObj.pid).subscribe((data) => { 
      console.log(data);
      this.notifications = data;
      for(let i = 0; i < data.length; i++) {
        if(data[i].read == false) {
          this.hasNotification = true;
        }
        this.hasNotification = false;
      }
    });
  }

  // public handleClick() {
  //   let sessionProfile : any = sessionStorage.getItem("profile");
  //   let sessionProfileObj = JSON.parse(sessionProfile);
  //   if(this.hasNotification == false) {
  //     for(let i = 0; i < this.notifications.length; i++) {
  //       const updateNotification = {
  //         ...this.notifications[i],
  //         read: true
  //       }
  //       console.log(updateNotification);
  //       this.notificationService.updateNotification(sessionProfileObj.pid, updateNotification).subscribe((data)=> {
  //       })
  //       this.hasNotification = false;
  //     }    
  //   }
  // }
}
