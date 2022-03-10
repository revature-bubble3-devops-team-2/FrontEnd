import { Profile } from "./profile";

//ZA a class to generate a group object
export class Group {
  groupId?: number;
  groupName?: string;
  imgurl?: string;
  coverImgurl?:string;
  owner?: Profile;
  members?: Profile[] = [];

  constructor(groupId: number, groupName: string, owner: Profile, members: Profile[]) {
    this.groupId = groupId;
    this.groupName = groupName;
    this.owner = owner;
    for (let m in members) {
      this.members?.push(members[m]);
    }
  }
}


