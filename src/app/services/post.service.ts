import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { Profile } from 'app/models/profile';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  posts = [
    {
      psid: 1,
      creator: new Profile(1, "First", "Last", "Pass", "a@lachlan.dev", "FL"),
      body: "A new post.",
      imgURL: "https://source.unsplash.com/random/300x300",
      datePosted: Date.parse("16 Nov 2021 00:00:00 GMT")
    },
    {
      psid: 2,
      creator: new Profile(2, "Amy", "Aadams", "Pass", "ant@lachlan.dev", "aaadams"),
      body: "Hello everyone!",
      imgURL: "https://source.unsplash.com/random/300x300",
      datePosted: Date.parse("17 Nov 2021 00:00:00 GMT")
    },
    {
      psid: 3,
      creator: new Profile(2, "Amy", "Aadams", "Pass", "ant@lachlan.dev", "aaadams"),
      body: "Another post.",
      imgURL: "https://source.unsplash.com/random/300x300",
      datePosted: Date.parse("18 Nov 2021 00:00:00 GMT")
    }
  ];

  followers = [
    {
      fid:1,
      portfolio_id:1
    },
    {
      fid:2,
      portfolio_id:2
    }
  ];

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<any> {
    return this.http.get<any>("http://localhost:3000/post");
  }

  getPostsByFollowers(): any {
    return this.posts;
  }

  public convertTransactionTime(datePosted: number){
    var d = new Date(datePosted);
    var formattedDate = (d.getMonth() + 1)  + "-"  +d.getDate()+  "-"+ d.getFullYear() ;
    var hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
    var minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
    var formattedTime = hours + ":" + minutes;

    formattedDate = formattedDate + " " + formattedTime;
    return formattedDate;
  }
}
