import { Profile } from './../../../models/profile';
import { Component, OnInit, Input  } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-following-list',
  templateUrl: './following-list.component.html',
  styleUrls: ['./following-list.component.css']
})
export class FollowingListComponent implements OnInit {
  @Input() profiles! : Profile[];
  @Input() text : string | any;

  constructor(public activeModal: NgbActiveModal) { }



  ngOnInit(): void {
  }

}
