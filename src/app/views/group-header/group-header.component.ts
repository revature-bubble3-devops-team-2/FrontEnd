import { Profile } from 'app/models/profile';
import { Group } from 'app/models/group';
import { GroupService } from 'app/services/group.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  urlCoverPhotoIconBubble: any = `../../../../assets/favicon.png`;
  urlGroupPhotoIconBubble: any ='../../../../assets/favicon.png';

  id: any;
  sessionId: any;
  profile: Profile | any;
  group: Group | any;
  owner: Profile | any;
  groupName: any;
  groupDesc: any;
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
      this.groupDesc = g.description;
      this.urlGroupPhotoIconBubble=g.imgurl||this.urlGroupPhotoIconBubble;
      this.urlCoverPhotoIconBubble=g.coverImgurl||this.urlCoverPhotoIconBubble;
    });
  }

  changeFile(file: any) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
  }

  onUpdateGroupImg(event : any) {
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        this.changeFile(file).then((e: any): any => {
          let group:Group={
              groupId:this.id,
              imgurl:e
          }
          this.urlGroupPhotoIconBubble = e;
          this.groupService.updateGroup(group).subscribe(d=> {
            console.log("here");
            window.location.reload();
          });
        });
    }
  }

  onUpdateGroupCover(event : any) {
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        this.changeFile(file).then((e: any): any => {
          let group:Group={
              groupId:this.id,
              coverImgurl:e
          }
          this.urlCoverPhotoIconBubble = e;
          this.groupService.updateGroup(group).subscribe(d=> {
            console.log("here");
            window.location.reload();
          });
        });
    }
  }
}
