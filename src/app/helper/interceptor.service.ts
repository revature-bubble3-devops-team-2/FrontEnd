import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  

 

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const profileToken = sessionStorage.getItem('Authorization');
    const modifiedReq = req.clone({ 
      headers: req.headers.set('Authorization', `${profileToken}`),
    });
    console.log(modifiedReq);
    console.log(profileToken);
    return next.handle(modifiedReq);
  }
}
