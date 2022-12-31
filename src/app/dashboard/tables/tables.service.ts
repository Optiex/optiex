import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  constructor(public http: HttpClient) { }

  getSchema(): Observable<any> {
    return this.http.get(`${environment.SERVER_ADDRESS}/report/form_schema/`);
  }

}
