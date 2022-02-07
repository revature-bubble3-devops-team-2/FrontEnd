import { ProfileService } from 'app/services/profile.service';
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
  public profile: Profile | any;
  public group: Group | any;
  public groups: Group[] = [];
  public groupName: string = '';
  public searchName: string = '';

  constructor(
    public groupService: GroupService,
    public profileService: ProfileService
  ) {}

  // Need a way to assign current profile to the Profile obj.
  // Below doesn't work
  ngOnInit(): void {
    let prof: any = sessionStorage.getItem('profile');
    prof = JSON.parse(prof);

    this.profile = new Profile(
      prof.pid,
      prof.firstName,
      prof.lastName,
      prof.passkey,
      prof.email,
      prof.username
    );

    // this.profileService.getProfileByPid(prof.pid).subscribe((data:any) => {
    //   this.profile.email = data.email;
    //   this.profile.firstName = data.firstName;
    //   this.profile.imgurl = data.imgurl;
    //   this.profile.lastName = data.lastname;
    //   this.profile.passkey = data.passkey;
    //   this.profile.pid = data.pid;
    //   this.profile.username = data.username;
    // });
  }

  public createGroup() {
    this.groupService.createGroup(this.profile, this.groupName);
  }

  public searchByName() {
    if (this.searchName == '') {
      return;
    } else {
      this.groups = [];
      this.groupService
        .SearchGroupbyName(this.searchName)
        .subscribe((data: any) => {
          for (let g of data) {
            this.groups.push(g);
          }
        });
    }
  }

  public getGroupName(target: number) {
    let result = this.groups[target].groupName;
    return result;
  }

  public joinGroup(targetGroup: number) {
    let result = this.groups[targetGroup].gid;
    if (!result) {
      return;
    } else {
      if (this.profile.myGroups.includes(this.groups[targetGroup])) {
        alert('Already in this group');
      } else {
          this.groupService.joinGroup(result, this.profile.pid);
      }
    }
  }

  public leaveGroup(targetGroup: number) {
    let result = this.groups[targetGroup].gid;
    if (!result) {
      return;
    } else {
      if (this.profile.myGroups.includes(this.groups[targetGroup])) {
        alert('Already in this group');
      } else {
          this.groupService.leaveGroup(result, this.profile.pid);
      }
    }

  }
}
