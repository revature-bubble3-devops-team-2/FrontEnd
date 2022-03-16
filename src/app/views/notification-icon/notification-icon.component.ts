import { Component, Input, OnInit, Output } from '@angular/core';
import { NotificationService } from 'app/services/notification.service';
import { Notification } from 'app/models/notification';

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

  constructor(private notificationService: NotificationService){
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
      }
    });
  }

  public handleClick() {
    let sessionProfile : any = sessionStorage.getItem("profile");
    let sessionProfileObj = JSON.parse(sessionProfile);
    if(this.hasNotification == true) {
      for(let i = 0; i < this.notifications.length; i++) {
        const updateNotification = {
          ...this.notifications[i],
          isRead: true
        }
        this.notificationService.updateNotification(sessionProfileObj.pid, updateNotification).subscribe((data)=> {
        })
        this.hasNotification = false;
      }    
    }
  }

  // public showNotification() {
  //   if(this.hasNotification == true) {
  //     this.hasNotification = false;
  //   }
  // }

}
