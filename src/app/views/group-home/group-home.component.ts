import { ProfileService } from 'app/services/profile.service';
import { Profile } from 'app/models/profile';
import { Post } from 'app/models/post';
import { PostService } from 'app/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'app/models/group';
import { GroupService } from 'app/services/group.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group-home',
  templateUrl: './group-home.component.html',
  styleUrls: ['./group-home.component.css'],
})
export class GroupHomeComponent implements OnInit {
  constructor(
    private groupService: GroupService,
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) {}

  profile: Profile | any;
  group: Group | any;
  owner: Profile | any;
  groupMembers: Profile[] | any;
  memberProfiles: Profile[] | any;

  id: any;

  sessionId: any;
  firstName: any;
  lastName: any;
  email: any;
  username: any;

  url: any = `../../../../assets/favicon.png`;
  posts: any[] = [];
  groupPosts: Post[] = [];

  failed: boolean = false;
  success: boolean = false;
  followed: boolean = false;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(`id: ${this.id}`);

    this.group = this.groupService.getGroupByID(this.id).subscribe( (g:any) =>{
       this.owner = g.owner;
       console.log(this.owner);
       this.groupMembers = g.members;
       console.log(this.groupMembers)
      });
    // let sessionProfile: any = sessionStorage.getItem('profile');
    // sessionProfile = JSON.parse(sessionProfile);
    // this.sessionId = sessionProfile.pid;
    // console.log(`sessionid: ${this.sessionId}`);
    // this.memberProfiles = data.members;
  }
}
