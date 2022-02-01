import { HomeComponent } from './../home/home.component';
import { Post } from 'app/models/post';
import { PostService } from 'app/services/post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'app/models/profile';
import { ProfileService } from 'app/services/profile.service';
@Component({
  selector: 'app-profileview',
  templateUrl: './profileview.component.html',
  styleUrls: ['./profileview.component.css']
})
export class ProfileviewComponent implements OnInit {

  constructor(private profileService: ProfileService , private route: ActivatedRoute ,
    private  postService : PostService , private router: Router) { }


  profile : any;
  id : any ;
  firstName: any ;
  lastName: any ;
  email: any ;
  username : any;


  url : any ;

  posts :any[] =[] ;
  profilePosts : Post[] =[];



  async ngOnInit(): Promise<void>  {
    this.id = this.route.snapshot.paramMap.get('id');

   this.profile = this.profileService.getProfileByPid(this.id).subscribe( (e : any) =>{
    this.id = e.pid;
    this.firstName =e.firstName;
    this.lastName = e.lastName;
    this.email= e.email;
    this.url  = e.imgurl ?  e.imgurl : `../../../../assets/favicon.png` ;
    this.username = e.username;
    this.getFollowerPosts(1);

    });





  }


  getFollowerPosts(scrollcount: number): any {
    this.postService.getPostsByFollowers(scrollcount);
    this.postService
      .getFollowerPosts()
      .subscribe( (data: any) => {
        if (data) {
          this.posts = data;

          this.profilePosts =this.posts.filter((p:Post)=> p.creator.pid == this.id);
        }
      });



}
goBack(){
  this.router.navigate(['/home']);
}


}
