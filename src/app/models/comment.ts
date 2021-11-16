import { Time } from "@angular/common";
import { Post } from "./post";
import { Profile } from "./profile";

export class Comment {
    cid?:number;
    creator?:Profile;
    post?: Post;
    cBody?: string;
    timeCreated?: Date;
    previous?: Comment;
}
