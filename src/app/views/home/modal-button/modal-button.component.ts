import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalUpdateFormComponent } from '../modal-update-form/modal-update-form.component';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal-button',
  templateUrl: './modal-button.component.html',
  styleUrls: ['./modal-button.component.css']
})
export class ModalButtonComponent{

  constructor(private modalService: NgbModal) { }

  // Font Awesome Icon
  faUserEdit = faUserEdit;

  open() {
     this.modalService.open(ModalUpdateFormComponent, {modalDialogClass: "profilemodal"});
  }

}
