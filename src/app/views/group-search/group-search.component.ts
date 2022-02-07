import { GroupService } from 'app/services/group.service';
import { Component, OnInit } from '@angular/core';
import { Group } from 'app/models/group';
import { Profile } from './../../models/profile';

@Component({
  selector: 'app-group-search',
  templateUrl: './group-search.component.html',
  styleUrls: ['./group-search.component.css']
})
// This is just a copy-paste of the search component refactored for group lookup
export class GroupSearchComponent {

  groupName = '';
  public pro = new Profile(0,'', '', '', '', '');
  public pros: Profile[] = [];
  public group = new Group(0,"",this.pro,this.pros);
  id = 0;
  public groups: any

  constructor(private groupService: GroupService) { }

  public setid(id: number): void{
    this.id = id
  }

  public searchGroup(groupName:string){
    console.log(groupName)
    this.groupService.SearchGroupbyName(this.groupName)
      .subscribe(data => this.groups = data)
  }

}
