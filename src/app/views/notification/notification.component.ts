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
  }
  
  showMore(){
    ++this.scrollCount;
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
          if(data[i].fromProfileId.imgurl == null){
            data[i].fromProfileId.imgurl = "../../../assets/favicon.png"
          }
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
          if(data[i].fromProfileId.imgurl == null){
            data[i].fromProfileId.imgurl = "../../../assets/favicon.png"
          }
          this.isReadNotifications.push(data[i]);
        }
      }

      console.log('this.isReadNotifications:', this.isReadNotifications)
    });
  }

}
