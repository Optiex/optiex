import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private storage: Storage) { }

  login(credentials: { username:any; password:any }): Observable<any> {
    console.log(`${environment.SERVER_ADDRESS}/c/login/`);
    return this.http.post(`${environment.SERVER_ADDRESS}/c/login/`, credentials);
  }

  async isLoggedIn() {
    return JSON.parse(await this.storage.get('user'));
  }

  async getSessionId() {
    let sessionid = JSON.parse(await this.storage.get('user')).sessionid;
    console.log(sessionid);
    return sessionid;
  }
}
