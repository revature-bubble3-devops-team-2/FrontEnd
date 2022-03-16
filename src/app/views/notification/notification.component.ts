import { Component, OnInit } from '@angular/core';
import { Notification } from 'app/models/notification';
import { NotificationService } from 'app/services/notification.service';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  //Need to grab data from database.
  hasNotification:boolean = false;
  session:any = {};
  id:number = 0;
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) { }

  scrollCount:number = 1;
  

  public getNotifications(scrollcount:number) {
    

  }

  onScroll() {
    ++this.scrollCount;
    //this.getNotifications(++this.scrollcount);
  }
  showMore(){
    ++this.scrollCount;
    //this.getNotifications(++this.scrollcount);
  }

  ngOnInit(): void {
    let sessionProfile : any = sessionStorage.getItem("profile");
    this.session = JSON.parse(sessionProfile);
    this.id = this.session.pid;
    this.showNotification();
  }

  showNotification() {
    let sessionProfile : any = sessionStorage.getItem("profile");
    let sessionProfileObj = JSON.parse(sessionProfile);
    this.notificationService.getNotifications(sessionProfileObj.pid).subscribe((data) => {    
      this.notifications = data;
      console.log('notifications:', this.notifications);
      
      for(let i = 0; i < data.length; i++) {
        if(data[i].read == false) {
          this.hasNotification = true;
        }
      }
    });
  }

}
