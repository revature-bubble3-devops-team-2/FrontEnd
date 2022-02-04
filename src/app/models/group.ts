import { Profile } from "./profile";

//ZA a class to generate a group object
export class Group {
  gid?: number;
  groupName?: string;
  owner?: Profile;
  members?: Profile[] = [];

  constructor(gid: number, groupName: string, owner: Profile, members: Profile[]) {
    this.gid = gid;
    this.groupName = groupName;
    this.owner = owner;
    for (let m in members) {
      this.members?.push(members[m]);
    }
  }
}
