import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  IsLoggedIn(){
    return !!sessionStorage.getItem('Authorization');
  }

}
