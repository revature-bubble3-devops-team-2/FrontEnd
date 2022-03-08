import { Group } from "./group";

export class Profile {

    pid?:number;
    firstName?:string;
    lastName?:string;
    passkey?:string;
    email?:string;
    username?:string;
    imgurl?: string;
    coverImgurl?: string; //cover photo img url
    groups?:Group[];
    verification?: boolean;

    constructor(pid:number, firstName:string, lastName:string, passkey:string, email:string, username:string, verification:boolean, groups:Group[]){

        this.pid = pid;
        this.firstName = firstName;
        this.lastName = lastName;
        this.passkey = passkey;
        this.email = email;
        this.username = username;
        this.groups= groups;
        this.verification = verification;

    }
}
