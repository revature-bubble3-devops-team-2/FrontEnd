import { Profile } from "./profile";

export interface Post {
    postId?: number;
    creator: Profile;
    body: string;
    datePosted: Date;
    imgURL?: string;
}
