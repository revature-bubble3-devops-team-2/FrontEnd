import { Profile } from "./profile";

export interface Post {
    psid?: number;
    creator: Profile;
    body: string;
    datePosted: Date;
    imgURL?: string;
}
