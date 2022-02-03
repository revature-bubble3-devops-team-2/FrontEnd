//ZA a class to generate a group object
export class Group {

  gid:number = 0;
  groupName:string = '';
  owner:number = 0;
  members:number[] = [];


  constructor(jsonStr: string){
    let jsonObj: any = JSON.parse(jsonStr);
    for (let prop in jsonObj) {
      if(prop == 'groupId'){
        this.gid = Number(prop);
      }else if(prop == 'groupName'){
        this.groupName = prop;
      }else if(prop == 'owner'){
        this.owner = Number(prop);
      }else if(prop == 'members'){
        let membersResult: any = JSON.parse(prop)
        for(let member in membersResult){
          this.members.push(Number(member));
        }
      }
    }
  }
}

//ZA A class to generate a single page of group objects
export class GroupPage{
  // Fill out details when we get pagination info
}
