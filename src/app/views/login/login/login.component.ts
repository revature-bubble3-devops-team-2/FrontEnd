import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String = "";
  password: String = "";
  

  constructor() { 
  }

  ngOnInit(): void {
  }

  onLogin(event: Event, username: String, password: String): void {
    //Prevents the refresh of the page
    event.preventDefault();

    console.log("Login", username, password);
    //TODO: Some code to check with backend to login

    //TODO: If ^ success, redirect to home page, otherwise error message.
  }
}
