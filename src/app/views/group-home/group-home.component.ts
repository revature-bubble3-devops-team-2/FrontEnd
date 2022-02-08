import { ProfileService } from 'app/services/profile.service';
import { Profile } from 'app/models/profile';
import { GroupService } from 'app/services/group.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group-home',
  templateUrl: './group-home.component.html',
  styleUrls: ['./group-home.component.css'],
})
export class GroupHomeComponent implements OnInit {
  constructor(
    public groupService: GroupService,
    public profileService: ProfileService,
    public profile: Profile
  ) {}

  ngOnInit(): void {}
}
