import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Observable } from 'rxjs';
import { AuthenticationServiceService } from '../services/authentication-service.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthenticationServiceService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // let userDetails = Storage.get({key:'user'});
    // userDetails.then((value) => {
    //   let sessionid = JSON.parse(value.value).sessionid;
    //   console.log(sessionid);
    let sessionId = this.authService.getSessionId();
    req = req.clone({
        setHeaders: {
          "Content-Type": "application/json",
          "Cookie": "sessionid="+sessionId
        },
        withCredentials: true
      });
    return next.handle(req);
  }
}
