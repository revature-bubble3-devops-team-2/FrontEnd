import { Profile } from './../../../models/profile';
import { Component, Input  } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faFrown} from '@fortawesome/free-regular-svg-icons';



@Component({
  selector: 'app-following-list',
  templateUrl: './following-list.component.html',
  styleUrls: ['./following-list.component.css']
})
export class FollowingListComponent {
  @Input() profiles! : Profile[];
  @Input() text : string | any;

  faFrown = faFrown;

  constructor(public activeModal: NgbActiveModal) { }

}
