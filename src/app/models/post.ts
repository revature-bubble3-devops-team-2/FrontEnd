import { Profile } from "./profile";

export class Post {

    psid?:number;
    creator?:Profile;
    body?:string;
    imgURL?:string;
    datePosted?:string;

    constructor(psid:number, creator:Profile, body:string, imgURL:string, datePosted:string){
        this.psid = psid;
        this.creator = creator;
        this.body = body;
        this.imgURL = imgURL;
        this.datePosted = datePosted;
    }
}
