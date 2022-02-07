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
  public gname: string = "";


  constructor(
    public groupService: GroupService,
    public profileService: ProfileService
  ) {}

  // Need a way to assign current profile to the Profile obj.
  // Below doesn't work
  ngOnInit(): void {
    let prof: any = sessionStorage.getItem('profile');
    prof = JSON.parse(prof);

    this.profile = new Profile(prof.pid, prof.firstName, prof.lastName, prof.passkey, prof.email, prof.username)
    console.log(this.profile);

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

  public createGroup(gn: string) {
    this.groupService.createGroup(this.profile, gn)
  }

  public searchByName(gn: string){
    this.groupService.SearchGroupbyName(gn).subscribe((data:any) => {
      console.log(data);
      this.groups.push(data);
    })
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
