import { Component, OnInit } from '@angular/core';
import { GroupService } from 'app/services/group.service';
import { ProfileService } from 'app/services/profile.service';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { Output, EventEmitter } from '@angular/core';
import { Group } from 'app/models/group';
import { Profile } from 'app/models/profile';

@Component({
  selector: 'app-group-mypage',
  templateUrl: './group-mypage.component.html',
  styleUrls: ['./group-mypage.component.css']
})
export class GroupMypageComponent implements OnInit {

  public profile: Profile | any;
  faUsers: any = faUsers;
  mGroups: Group[] = [];
  // @Output() emitClick: EventEmitter<number> = new EventEmitter();
  constructor(
    public groupService: GroupService,
    public profileService: ProfileService
  ) { }

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
      prof.groups,

    );
    this.updateJoinedGroups();
  }

  public getJoinedGroupName(target: number) {
    return this.mGroups[target].groupName;
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

  public leaveGroup(targetGroup: number) {
    let targetId = this.mGroups[targetGroup].groupId;
    let userId = this.profile.pid;

    if (!!targetId) {
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
