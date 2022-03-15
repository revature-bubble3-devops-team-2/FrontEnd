import { PostService } from 'app/services/post.service';
import { ProfileService } from 'app/services/profile.service';
import { Profile } from 'app/models/profile';
import { Post } from 'app/models/post';
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

  profile : Profile | any;
  followersProfiles : Profile[] | any;
  followersOfThisUser : Profile[] | any;
  id : any ;
  sessionId : any;
  firstName: any ;
  lastName: any ;
  email: any ;
  username : any;
  url: any = `../../../../assets/favicon.png`;
  imgurl: any; //group cover photo
  posts :any[] =[] ;

  failed: boolean = false;
  success: boolean = false;
  followed: boolean = false;


  //Groups
  groupMembers: Profile[] | any;
  group: Group | any;
  owner: Profile | any;
  memberProfiles: Profile[] | any;
  groupPosts: Post[] = []; //profilePosts

  //Tabs
  showPosts: boolean = true;
  showMembers: boolean = false;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    let sessionProfile : any = sessionStorage.getItem("profile");
    sessionProfile = JSON.parse(sessionProfile);
    this.sessionId = sessionProfile.pid;

    this.groupService.getGroupMembers(this.id).subscribe( (m: any) =>{
      this.memberProfiles = m;
      // console.log(this.memberProfiles);
    })

    this.groupService.getGroupByID(this.id).subscribe( (g:any) =>{
       this.owner = g.owner;
       this.groupMembers = g.members;
       this.groupService.currentGroup = g;
       this.getGroupPosts();
      });


  }

  getGroupPosts() {
    this.postService.getGroupPosts(this.id).subscribe((data) => {
      this.groupPosts = data;
      this.groupPosts.sort((a, b) => {
          let dateA = new Date(a.datePosted ?? 0);
          let dateB = new Date(b.datePosted ?? 1)
          return dateB.getTime() - dateA.getTime()
      })
    })
  }

  toggleViewTabs(){
    if(this.showPosts){
      this.showPosts = false;
      this.showMembers = true;
    } else {
      this.showPosts = true;
      this.showMembers = false;
    }
  }
}
