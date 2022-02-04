import { Component, OnInit } from '@angular/core';
import { Group } from 'app/models/group';
import { GroupService } from 'app/services/group.service';

@Component({
  selector: 'app-teams-page',
  templateUrl: './teams-page.component.html',
  styleUrls: ['./teams-page.component.css'],
})
export class TeamsPageComponent implements OnInit {
  myGroups: Group[] = [];
  allGroups: Group[] = [];

  constructor(public service: GroupService){}

  ngOnInit(): void {
    // this.allGroups = this.service.getAllGroups();
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

