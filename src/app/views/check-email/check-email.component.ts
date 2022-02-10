import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFrown} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-check-email',
  templateUrl: './check-email.component.html',
  styleUrls: ['./check-email.component.css']
})
export class CheckEmailComponent implements OnInit {

  faFrown = faFrown;

  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 5000);
  }

}
