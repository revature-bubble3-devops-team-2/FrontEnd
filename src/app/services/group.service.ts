import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group } from 'app/models/group';
import { url } from 'inspector';
import { Observable } from 'rxjs';

const baseurl= `${url}/`;

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private groupsList!: Group[];

  constructor(private httpClient:HttpClient) {

    this.getAllGroups();

  }
  //Get all groups from backend -- to be depracated when pagination implemented
  getAllGroups(){
    let allGroups:Group[] = []
    this.groupsList = allGroups;
  }
  // Get top page of groups from backend -- to replace getAllGroups when pagination implemented
  getTopGroups() {
    throw new Error('Method not implemented.');
    let topGroups: Group[];
    let returned; // TODO: REQUEST TO THE BACK END
    for(let g of returned){
      topGroups.push(g)
    }
    this.groupsList = topGroups;
  }
  //Get next page of groups from backend -- to be implemented when pagination implemented
  getNextGroups(target: string) {

  }

  //Get Group by ID from Back end Return Observable<Group>
  getGroupByID(id:number){

  }

  //Get list of groups that are similar in name to input return Observable<GroupPage>
  SearchGroupbyName(name:string){
  }

}
