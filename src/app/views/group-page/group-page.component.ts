import { Profile } from 'app/models/profile';
import { Component, OnInit } from '@angular/core';
import { Group } from 'app/models/group';
import { GroupService } from 'app/services/group.service';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.css'],
})
export class GroupPageComponent implements OnInit {

  constructor(public groupService: GroupService, public profile: Profile ){}

  ngOnInit(): void {
    this.profile = JSON.parse("sessionStorage.getItem('profile'")
  }

  public createGroup(gname: string){
    this.groupService.createGroup(this.profile, gname);
  }


  // public joinGroup(temp: Group) {
  //   if (this.myGroups.includes(temp))
  //   alert("Already in this group");
  //   else
  //   this.myGroups.push(temp);
  // }

  // public leaveGroup(temp: Group) {
  //   this.myGroups.forEach((value, index) => {
  //     if (value == temp) this.myGroups.splice(index, 1);
  //   });
  // }


}

