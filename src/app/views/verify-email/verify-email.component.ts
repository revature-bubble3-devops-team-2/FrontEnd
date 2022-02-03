import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

   confirmed: boolean = false;
  constructor() { }

  ngOnInit(): void {
    localStorage.getItem('randomCode');

    
  }

}
