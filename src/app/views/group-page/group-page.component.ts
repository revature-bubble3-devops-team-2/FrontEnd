import { Profile } from 'app/models/profile';
import { Component, OnInit } from '@angular/core';
import { Group } from 'app/models/group';
import { GroupService } from 'app/services/group.service';

@Component({
  selector: 'app-teams-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.css'],
})
export class TeamsPageComponent implements OnInit {
  // profile: Profile = sessionStorage.getItem('profile');
  search: any;
  myGroups: Group[] = [];
  groups: Group[] = [];
  sGroup?: Group;

  constructor(public groupService: GroupService){}

  ngOnInit(): void {

  }

  public searchGroup(num: number){
    this.groupService.getGroupByID(num).subscribe((data) => {
      console.log(data);
    })

  }

  public joinGroup(temp: Group) {
    if (this.myGroups.includes(temp))
    alert("Already in this group");
    else
    this.myGroups.push(temp);
  }

  public leaveGroup(temp: Group) {
    this.myGroups.forEach((value, index) => {
      if (value == temp) this.myGroups.splice(index, 1);
    });
  }
}

