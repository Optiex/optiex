import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Observable, throwError, from } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { LoginService } from '../login/login.service';

const USER_KEY = 'user';

@Injectable()
export class AuthInterceptorService {


  constructor(private storage: Storage, private loginService: LoginService, private alertController: AlertController) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // return next.handle(request); //login request

    return from(this.storage.get(USER_KEY))
    .pipe(
      switchMap(token => {
        token = JSON.parse(token);

        if (token.sessionid) {
          console.log(token.sessionid)
          // request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token.sessionid) });
          request = request.clone({ headers: request.headers.set('Authorization', token.sessionid) });
        }
        request = request.clone({withCredentials:true});

        if (!request.headers.has('Content-Type')) {
          request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        return next.handle(request).pipe(
          map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
            }
            return event;
          }),
          catchError((error: HttpErrorResponse) => {
            const status =  error.status;
            const reason = error && error.error.reason ? error.error.reason : '';

            // this.presentAlert(status, reason);
            return throwError(error);

          })
        );
      })
    );
  }

  async presentAlert(status:any, reason:any) {

    const alert = await this.alertController.create({
        header: status + ' Error',
        subHeader: 'Subtitle',
        message: reason,
        buttons: ['OK']
    });

    await alert.present();
  }
}
