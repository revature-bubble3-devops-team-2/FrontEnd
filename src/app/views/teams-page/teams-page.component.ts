import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teams-page',
  templateUrl: './teams-page.component.html',
  styleUrls: ['./teams-page.component.css'],
})
export class TeamsPageComponent implements OnInit {
  myteams: Team[] = [];
  teams: Team[] = [];
  temp: Team = new Team('Baddest Babies', 'Angelica Pickles');
  temp1: Team = new Team('Yay Me', 'London Tipton');
  temp2: Team = new Team('North Shore Weather', 'Karen Smith');
  temp3: Team = new Team('Curses...', 'Mojo Jojo');

  ngOnInit(): void {
    this.teams.push(this.temp);
    this.teams.push(this.temp1);
    this.teams.push(this.temp2);
    this.teams.push(this.temp3);
  }

  public joinTeam(temp: Team) {
    this.myteams.push(temp);
  }
  public leaveTeam(temp: Team) {
    this.myteams.forEach((value, index) => {
      if (value == temp) this.myteams.splice(index, 1);
    });
  }
}

class Team {
  public name: string = '';
  public leader: string = '';

  constructor(name: string, leader: string) {
    this.name = name;
    this.leader = leader;
  }
}
