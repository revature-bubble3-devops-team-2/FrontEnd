import { PostService } from 'app/services/post.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'app/services/profile.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  id: number = 0;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  updated: boolean = false;
  credential: string = '';
  key = '';
  url: any = this.profileService.getProfile().imgurl
    ? this.profileService.getProfile().imgurl
    : `../../../../assets/favicon.png`;
  session: any;

  constructor(
    private profileService: ProfileService,
    private httpClient: HttpClient,
    private router: Router,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    let sessionProfile: any = sessionStorage.getItem('profile');
    this.session = JSON.parse(sessionProfile);
    this.url = this.session.imgurl
      ? this.session.imgurl
      : `../../../../assets/favicon.png`;
    this.id = this.session.pid;
  }

  get profile() {
    let sessionProfile = sessionStorage.getItem('profile');
    if (sessionProfile != null) {
      return JSON.parse(sessionProfile);
    }
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.changeFile(file).then((e: any): any => {
        this.profileService.setImhg(e);
        this.url = e;
        this.profileService
          .updateProfile(this.profileService.getProfile())
          .subscribe((d) => console.log(d));
      });
    }
  }

  changeFile(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  // goBack(){
  //   this.router.navigate(['/home']);
  // }
}
