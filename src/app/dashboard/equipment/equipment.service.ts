import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(private http: HttpClient) { }

  getEquipmentCharts(id:any): Observable<any> {
    return this.http.post(`${environment.SERVER_ADDRESS}/c/emp/chart/list/`,{id:id});
  }

  getSensorsData(data:any) {
    return this.http.post(`${environment.SERVER_ADDRESS}/s/get/data/`, data);
  }

  showGraphOnFrontPage(data:any) {
    return this.http.post(`${environment.SERVER_ADDRESS}/s/show/graph/`,data);
  }

}
