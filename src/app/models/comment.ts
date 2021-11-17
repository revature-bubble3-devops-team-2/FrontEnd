import { Time } from "@angular/common";
import { Post } from "./post";
import { Profile } from "./profile";

export class Comment {
    cid?:number;
    writer?:Profile;
    post?: Post;
    cbody?: string;
    dateCreated?: Date;
    previous?: Comment;
}
