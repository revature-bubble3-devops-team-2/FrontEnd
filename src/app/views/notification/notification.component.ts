import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/services/notification.service';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

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
    this.showNotification;
  }

  public showNotification() {
    let sessionProfile : any = sessionStorage.getItem("profile");
    let sessionProfileObj = JSON.parse(sessionProfile);
    this.notificationService.getNotifications(sessionProfileObj.pid).subscribe((data) => { 
      console.log(data);
    });
  }

}
