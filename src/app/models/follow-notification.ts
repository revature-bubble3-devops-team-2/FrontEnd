import { Comment } from "./comment";
import { Profile } from "./profile";
import { Post } from "./post";

export class FollowNotification {

    nid?:number;
    isRead:boolean;
    cid?:Comment;
    fromProfileId:Profile;
    toProfileId:Profile;
    postId?:Post;

    constructor(nid:number, isRead:boolean, cid:Comment, fromProfileId:Profile, toProfileId:Profile, postId: Post){
        this.nid = nid;
        this.isRead = isRead;
        this.cid = cid;
        this.fromProfileId = fromProfileId;
        this.toProfileId = toProfileId;
        this.postId = postId;
    }
}