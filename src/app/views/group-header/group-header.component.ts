import { Profile } from 'app/models/profile';
import { Group } from 'app/models/group';
import { GroupService } from 'app/services/group.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faCameraRetro,
  faUserPlus,
  faUserMinus,
  faUsers,
  faNewspaper
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-group-header',
  templateUrl: './group-header.component.html',
  styleUrls: ['./group-header.component.css'],
})

export class GroupHeaderComponent implements OnInit {
  // Font Awesome Icons
  faCameraRetro = faCameraRetro;
  faUserPlus = faUserPlus;
  faUserMinus = faUserMinus;
  faUsers = faUsers;
  faNewspaper = faNewspaper;
  url: any = `../../../../assets/favicon.png`;

  id: any;
  sessionId: any;
  profile: Profile | any;
  group: Group | any;
  owner: Profile | any;
  groupName: any;
  ownerName: any;

  groupMembers: Profile[] | any;
  memberProfiles: Profile[] | any;

  followed: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.group = this.groupService.getGroupByID(this.id).subscribe((g: any) => {
      this.groupName = g.groupName;
      this.ownerName = g.owner.username;
      this.groupMembers = g.members;
    });
  }
}
