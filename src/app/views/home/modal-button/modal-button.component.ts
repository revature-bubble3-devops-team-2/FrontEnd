import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalUpdateFormComponent } from '../modal-update-form/modal-update-form.component';

@Component({
  selector: 'app-modal-button',
  templateUrl: './modal-button.component.html',
  styleUrls: ['./modal-button.component.css']
})
export class ModalButtonComponent{

  constructor(private modalService: NgbModal) { }

  open() {
     this.modalService.open(ModalUpdateFormComponent);
  }

}
