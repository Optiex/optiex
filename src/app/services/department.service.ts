import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  getDepartmentList(): Observable<any> {
    return this.http.get(`https://analytics.optiex.co.in:1992/c/emp/department/list/`);
  }

}
