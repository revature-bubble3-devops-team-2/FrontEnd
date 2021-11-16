import { Component, Input, OnInit } from '@angular/core';
<<<<<<< HEAD:src/app/views/posts/post/post.component.ts
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; 
import { Post } from 'app/models/post';
=======
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from 'app/models/post'; 
>>>>>>> ff4c80807aefb67b316730308f945c945890c485:src/app/views/profile/posts/post/post.component.ts

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post!: Post;
  
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
