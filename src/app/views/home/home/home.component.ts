import { Component, OnInit } from '@angular/core';
import { Post } from 'app/models/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  post: Post = {
    psid: 1,
    creator: {
      pid: 1,
      username: 'profile3',
      passkey: '33',
      firstName: 'Three',
      lastName: 'LastThree',
      email: 'Email3',
    },
    body: 'Hello',
    datePosted: new Date(),
    imgURL: 'image_url1',
  };

  constructor() { }

  ngOnInit(): void {
  }

}
