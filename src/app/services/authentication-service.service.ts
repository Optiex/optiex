import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

import { Storage } from '@capacitor/storage';

const TOKEN_KEY = 'my-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';
  
  constructor(private http: HttpClient) {
    this.loadToken();
  }
  
  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      console.log('set token: ', token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }
  
  login(credentials: { username; password }): Observable<any> {
    return this.http.post(`https://analytics.optiex.co.in:1992/c/login/`, credentials).pipe(
    // map((data: any) => data.token),
    // switchMap((token) => {
    //   return from(Storage.set({ key: TOKEN_KEY, value: token }));
    // }),
    tap((_) => {
      this.isAuthenticated.next(true);
    })
    );
  }
  
  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return Storage.remove({ key: TOKEN_KEY });
  }

  async getSessionId () {
    let sessionId;
    let userDetails = await Storage.get({ key: 'user' });
    if(userDetails){
      sessionId = JSON.parse(userDetails.value).sessionId;
    }
    return sessionId;
  }

}