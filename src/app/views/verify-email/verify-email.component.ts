import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

   confirmed?: boolean;
   randomCode ?: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
        this.randomCode = params.randomCode;
        console.log(this.randomCode); // price
      }
    );
  if(this.randomCode == localStorage.getItem('randomCode')){
    this.confirmed = true;
  }else{
    this.confirmed = false;
  }
  }
  }
