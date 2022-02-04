import { Profile } from './../../models/profile';
import { ProfileService } from 'app/services/profile.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {


  username = '';
  public pro = new Profile(0,'', '', '', '', '', false)
  id = 0;
  public profiles: Profile[] = []

  constructor(private profile: ProfileService) { }

  public setid(id: number): void{
    this.id = id
  }

  public searchUser(){
    this.profile.getProfileByUsername(this.username)
      //.subscribe(data => {this.pro = data, this.setid(this.pro.pid ?? 0)})
      .subscribe(data => this.profiles.push(data))
  }

}
