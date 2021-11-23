import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Profile } from 'app/models/profile';
import { ProfileService } from 'app/services/profile.service';
import { FollowComponent } from '../../home/follow/follow.component';

@Component({
  selector: 'app-modal-update-form',
  templateUrl: './modal-update-form.component.html',
  styleUrls: ['./modal-update-form.component.css']
})
export class ModalUpdateFormComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private profileService: ProfileService, private modalService: NgbModal) { }

  profile: Profile = {};
  firstName: string = "";
  lastName: string = "";
  email: string = "";


  ngOnInit(): void {
    var modaled = document.querySelector('.modal-content');
    modaled?.setAttribute("style","border-radius:30px;");
    
    var sessionProfile = sessionStorage.getItem("profile");
    if(sessionProfile!=null){
      this.profile = JSON.parse(sessionProfile);
    }
    
    
}

  updateProfile(){
    if(this.email!=""){
      this.profile.email = this.email;
    }
    if(this.firstName!=""){
      this.profile.firstName = this.firstName;
    }  
    if(this.lastName!=""){
      this.profile.lastName = this.lastName;
    }
    this.profileService.updateProfile(this.profile).subscribe(
      (result)=>{
        sessionStorage.setItem("profile", JSON.stringify(result));
      }
    )
    this.activeModal.close();
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}