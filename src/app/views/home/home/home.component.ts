import { Component, OnInit } from '@angular/core';
import { Post } from 'app/models/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  post: Post = {
    psid: 2,
    creator: {
      pid: 2,
      username: 'profile3',
      passkey: '33',
      firstName: 'Three',
      lastName: 'LastThree',
      email: 'Email3',
    },
    body: '',
    datePosted: new Date(),
    imgURL: '',
  };

  ngOnInit(): void {
  }

}
