import { Profile } from "./profile";

export class Post {

    psid?:number;
    creator:Profile;
    body?:string;
    imgURL?:string;
    datePosted?:Date;

    constructor(psid:number, creator:Profile, body:string, imgURL:string, datePosted:Date){
        this.psid = psid;
        this.creator = creator;
        this.body = body;
        this.imgURL = imgURL;
        this.datePosted = datePosted;
    }

}

