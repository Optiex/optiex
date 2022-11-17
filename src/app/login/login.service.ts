import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private storage: Storage) { }

  login(credentials: { username:any; password:any }): Observable<any> {
    return this.http.post(`https://analytics.optiex.co.in:1992/c/login/`, credentials);
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
