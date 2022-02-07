import { Profile } from './../../models/profile';
import { ProfileService } from 'app/services/profile.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {


  username:string = 'defaultQuery';
  public pro = new Profile(0,'', '', '', '', '')
  id = 0;
<<<<<<< HEAD
  profiles:any;
=======
  public profiles: any
>>>>>>> theme

  constructor(private profile: ProfileService) { }

  public setid(id: number): void{
    this.id = id
  }

  public searchUser(username:string){
    console.log(username)
    this.profile.getProfileByUsername(username)
      .subscribe(data => this.profiles = data)
  }


}
