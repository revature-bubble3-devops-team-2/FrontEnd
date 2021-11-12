import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Profile } from '../../../models/profile';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  username: String = "";
  password: String = "";

  passHide:String = "Hidden";

  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com'
  posts: any;

  //Meant to be for test case
  getPosts() {
    let params = new HttpParams().set('userId', '1')

    this.posts = this.http.get(this.ROOT_URL + '/posts');
    console.log(this.posts);


    this.http.get(this.ROOT_URL + '/posts').subscribe(val => {
      console.log(val); //this is the data coming from the URL, now i need to test this with our backend once its up
    })
  }

  constructor(private http: HttpClient) { 
  }

  ngOnInit(): void {
    
  }

  onLogin(event: Event, username: String, password: String): void {
    //Prevents the refresh of the page
    event.preventDefault();

    console.log("Login", username, password);
    //TODO: Some code to check with backend to login
    let error = this.formValidation(username, password);
    console.log("There's an error: " + error);



    /*
        const requestBody = `username=${username}&password=${password}`;

        fetch("http://localhost:8082/login", {
            method: "POST",
            headers: {
                'Content-Type' :  'application/x-www-form-urlencoded'
            },
            body: requestBody
        }).then(r => {
          console.log(r);
          //Check for status code here
        }
    */
    //TODO: If ^ success, redirect to home page, otherwise error message.
  }

  //Return True if there's error, false if there isn't any.
  formValidation(username: String, password: String): boolean {
    let error = false;

    //Check username
    if (!username || username.length == 0)
    {
      console.log("Username is empty.");
      error = true;
    }

    //Check password
    if (!password || password.length == 0)
    {
      console.log("Password is empty.");
      error = true;
    }
    
    return error;
  }
}
