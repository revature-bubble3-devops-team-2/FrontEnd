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
  public mGroups: Group[] = [];
  public sGroups: Group[] = [];
  public groupName: string = '';
  public searchName: string = '';

  constructor(
    public groupService: GroupService,
    public profileService: ProfileService
  ) {}

  // Need a way to assign current profile to the Profile obj.
  // Below doesn't work
  ngOnInit(): void {
    this.updateProfile();

    let prof: any = sessionStorage.getItem('profile');
    prof = JSON.parse(prof);

    this.profile = new Profile(
      prof.pid,
      prof.firstName,
      prof.lastName,
      prof.passkey,
      prof.email,
      prof.username,
      prof.verification,
      prof.groups);

    this.updateJoinedGroups();

  }

  public updateProfile() {
    this.profile = this.profileService.getProfile();
  }

  public updateSession() {
    sessionStorage.setItem('profile', JSON.stringify(this.profile));
  }

  public updateJoinedGroups() {
    this.mGroups = [];
    for (let g of this.profile.groups) {
      this.mGroups.push(g);
    }
  }

  public updateProfileServiceProfile() {
    this.profileService
      .getProfileByPid(this.profile.pid)
      .subscribe((data: any) => {
        this.profileService.setData(data);
        this.updateProfile();
        this.updateJoinedGroups();
        this.updateSession();
      });
  }

  public createGroup() {
    if (this.groupName == '') {
      alert("Please enter a GROUP NAME to create a new group")
      return;
    }
    this.groupService
      .createGroup(this.profile, this.groupName)
      .subscribe((data: any) => {
        this.updateProfileServiceProfile();
        this.groupName = '';
      });
  }

  public searchByName() {
    if (this.searchName == '') {
      alert("please enter something to search by")
    } else {
      this.sGroups = [];
      this.groupService
        .SearchGroupbyName(this.searchName)
        .subscribe((data: any) => {
          for (let g of data) {
            this.sGroups.push(g);
          }
        });
    }
  }

  public getSearchGroupName(target: number) {
    return this.sGroups[target].groupName;
  }

  public getJoinedGroupName(target: number) {
    return this.mGroups[target].groupName;
  }

  public joinGroup(targetGroup: number) {
    let targetId = this.sGroups[targetGroup].groupId;
    let userId = this.profile.pid;

    if (!targetId) {
    } else {
      for (let g of this.profile.groups) {
        let gId = this.groupService.getGroupId(g);
        if (targetId == gId) {
          alert('Already in this group');
          return;
        }
      }
      this.groupService.joinGroup(targetId, userId).subscribe((groupData: any) => {
        this.profileService.getProfileByPid(userId).subscribe((userData: any) => {
          this.profileService.setData(userData);

          this.updateProfile();
          this.updateJoinedGroups();
          this.updateSession();
          this.searchName = '';
          this.sGroups = [];
        });
      });
    }
  }

  public leaveGroup(targetGroup: number) {
    let targetId = this.mGroups[targetGroup].groupId;
    let userId = this.profile.pid;

    if (!targetId) {
    } else {
      for (let g of this.profile.groups) {
        let gId = this.groupService.getGroupId(g);
        if (targetId == gId) {
          this.groupService
            .leaveGroup(targetId, userId)
            .subscribe((groupData: any) => {
              this.profileService
                .getProfileByPid(userId)
                .subscribe((userData: any) => {
                  this.profileService.setData(userData);
                  this.updateProfile();
                  this.updateJoinedGroups();
                  this.updateSession();
                  alert('Left the Group');
                });
            });
        }
      }
    }
  }
}
