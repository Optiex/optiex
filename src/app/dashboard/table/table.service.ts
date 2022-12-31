import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http: HttpClient) { }

  saveFormSchemaValue(data:any): Observable<any> {
    return this.http.post(
      `${environment.SERVER_ADDRESS}/report/form_schema_value/`,
      data
    );
  }

}
