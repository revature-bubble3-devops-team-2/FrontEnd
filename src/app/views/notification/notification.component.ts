import { Component, OnInit } from '@angular/core';
import { Notification } from 'app/models/notification';
import { NotificationService } from 'app/services/notification.service';
import { interval } from 'rxjs';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  session:any = {};
  id:number = 0;
  notifications: Notification[] = [];
  notReadNotifications: any = [];
  isReadNotifications: any = [];

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
   
    this.showNotifications();
    this.showisReadNotifications();
    
  }

  //this gets !isRead notifications
  showNotifications() {
    let sessionProfile : any = sessionStorage.getItem("profile");
    let sessionProfileObj = JSON.parse(sessionProfile);

    this.notificationService.getNotifications(sessionProfileObj.pid).subscribe((data) => {    
      this.notifications = data;
      
      for(let i = 0; i < data.length; i++) {
        if(data[i].read == false) {
          this.notReadNotifications.push(data[i]);
        }
      }

      console.log('this.notReadNotifications:', this.notReadNotifications)
    });
  }

  showisReadNotifications() {
    let sessionProfile : any = sessionStorage.getItem("profile");
    let sessionProfileObj = JSON.parse(sessionProfile);

    this.notificationService.getNotifications(sessionProfileObj.pid).subscribe((data) => {    
      this.notifications = data;
      
      for(let i = 0; i < data.length; i++) {
        if(data[i].read == true) {
          this.isReadNotifications.push(data[i]);
        }
      }

      console.log('this.isReadNotifications:', this.isReadNotifications)
    });
  }

}
