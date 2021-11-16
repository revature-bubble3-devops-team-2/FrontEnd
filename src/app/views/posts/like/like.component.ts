import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { Profile } from 'src/app/models/profile';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {

  public like(post Post, profile Profile)

  constructor() { }

  ngOnInit(): void {
  }

}
