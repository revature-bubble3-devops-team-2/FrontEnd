import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'app/services/profile.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

   confirmed?: boolean;
   randomCode ?: string;
   email ?: string;
  constructor(private profileService: ProfileService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.randomCode = params.randomCode;
        this.email = params.email;
        console.log(this.randomCode);

        if (this.randomCode == localStorage.getItem('randomCode')){
          this.confirmed = true;
          this.verifyUser(params.email);
          localStorage.removeItem('randomCode');
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 5000);
        } else {
          this.confirmed = false;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 5000);
        }

      });
  }

  verifyUser(mail: string): void {
    console.log("in verifyUser   " + mail)
    this.profileService.verifyUser(mail ?? "").subscribe(
      (data) => {
        if (data) {
          console.log(data)
        }
      
    }, error => console.log(error))
  }
}
