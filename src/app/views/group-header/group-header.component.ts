import { Profile } from 'app/models/profile';
import { Group } from 'app/models/group';
import { Post } from 'app/models/post';
import { PostService } from 'app/services/post.service';
import { GroupService } from 'app/services/group.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'app/services/profile.service';
import { FollowService } from 'app/services/follow.service';
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
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private postService: PostService,
    private groupService: GroupService,
    private router: Router,
    private followService: FollowService
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

//   profile : Profile | any;
//   followersProfiles : Profile[] | any;
//   id : any ;
//   sessionId : any;
//   firstName: any ;
//   lastName: any ;
//   email: any ;
//   username : any;
//   url : any  =  `../../../../assets/favicon.png`;
//   posts :any[] =[] ;
//   profilePosts : Post[] =[];

//   failed: boolean = false;
//   success: boolean = false;
//   followed : boolean = false;

//   async ngOnInit(): Promise<void>  {
//     this.id = this.route.snapshot.paramMap.get('id');
//     let sessionProfile : any = sessionStorage.getItem("profile");
//     sessionProfile = JSON.parse(sessionProfile);
//     this.sessionId = sessionProfile.pid;

//     console.log(this.sessionId );
//     console.log(this.id)

//     console.log(this.id ==this.sessionId )
//    this.profile = this.profileService.getProfileByPid(this.id).subscribe( (e : any) =>{
//     this.followersProfiles = e.following;
//     console.log(this.followersProfiles);
//     this.id = e.pid;
//     this.firstName =e.firstName;
//     this.lastName = e.lastName;
//     this.email= e.email;
//     this.url  = e.imgurl ?  e.imgurl : `../../../../assets/favicon.png` ;
//     this.username = e.username;
//     this.getFollowerPosts(1);

//     });

//   }

//   getFollowerPosts(scrollcount: number): any {
//     // this.postService.getPostsByFollowers(scrollcount);
//     // this.postService
//     //   .getFollowerPosts()
//     //   .subscribe( (data: any) => {
//     //     if (data) {
//     //       this.posts = data;

//     //       this.profilePosts =this.posts.filter((p:Post)=> p.creator.pid == this.id);
//     //     }
//     //   });

//       this.postService
//       .getAllPosts()
//       .subscribe( (data: any) => {

//         if (data) {
//           this.posts = data;
//           console.log( this.posts)
//           this.profilePosts =this.posts.filter((p:Post)=>{
//            return  p.creator.pid == this.id });
//         }
//       });

// }

// goBack(){
//   this.router.navigate(['/home']);
// }

// public joinGroup() {
// }

// leaveGroup() {
//     console.log("Email entered: ", this.email);
//     this.followed = false;
//     this.followService.unfollowUserByEmail(this.email).subscribe(
//       e => this.followed = false,
//       err => console.log(err)
//     )
// }
