import { Component, OnInit } from '@angular/core';
import { Group } from 'app/models/group';

@Component({
  selector: 'app-teams-page',
  templateUrl: './teams-page.component.html',
  styleUrls: ['./teams-page.component.css'],
})
export class TeamsPageComponent implements OnInit {
  myteams: Team[] = [];
  teams: Team[] = [];
  temp: Team = new Team(0,'Baddest Babies',1257, [1257,2304,4525]);
  temp1: Team = new Team(1,'Yay Me', 3412, [1000,2000,3000,4000,5000,1234,1235,1236,1237,1238]);
  temp2: Team = new Team(2,'North Shore Weather', 3925, [2500, 4582,4294]);
  temp3: Team = new Team(3,'Curses...', 8240, [8240,1452,9744,8842,9586,1154,3866]);

  ngOnInit(): void {
    this.teams.push(this.temp);
    this.teams.push(this.temp1);
    this.teams.push(this.temp2);
    this.teams.push(this.temp3);
  }

  public joinTeam(temp: Team) {
    if (this.myteams.includes(temp))
    alert("Already in this group");
    else
    this.myteams.push(temp);
  }
  public leaveTeam(temp: Team) {
    this.myteams.forEach((value, index) => {
      if (value == temp) this.myteams.splice(index, 1);
    });
  }
}

class Team {
  public gid: number;
  public groupName: string;
  public owner: number;
  public members: number[];

  constructor(gid: number, groupName: string, owner: number, members: number[]) {
    this.gid = gid;
    this.groupName = groupName;
    this.owner = owner;
    this.members = members;
  }
}
