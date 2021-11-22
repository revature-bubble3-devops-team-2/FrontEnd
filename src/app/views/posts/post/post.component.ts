import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; 
import { Post } from 'app/models/post'
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post!: Post;

  faTimes = faTimes;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
