import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'app/models/profile';
import { ProfileService } from 'app/services/profile.service';
@Component({
  selector: 'app-profileview',
  templateUrl: './profileview.component.html',
  styleUrls: ['./profileview.component.css']
})
export class ProfileviewComponent implements OnInit {

  constructor(private profileService: ProfileService , private route: ActivatedRoute) { }


  profile : any;
  id : any ;
  firstName: any ;
  lastName: any ;
  email: any ;
  username : any;


  url : any ;



  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

   this.profile = this.profileService.getProfileByPid(this.id).subscribe( (e : any) =>{
    this.id = e.pid;
    this.firstName =e.firstName;
    this.lastName = e.lastName;
    this.email= e.email;
    this.url  = e.imgurl ?  e.imgurl : `../../../../assets/favicon.png` ;
    this.username = e.username;
    });

  }






}
