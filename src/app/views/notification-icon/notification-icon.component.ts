import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification-icon',
  templateUrl: './notification-icon.component.html',
  styleUrls: ['./notification-icon.component.css']
})
export class NotificationIconComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

// public showNotifications() {
//   this.router.navigate(["/group-page"]);
// }

}
