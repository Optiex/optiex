import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  constructor(private http: HttpClient) { }


  getDepartments(): Observable<any> {
    return this.http.get(`${environment.SERVER_ADDRESS}/c/emp/department/list/`);
  }
}
