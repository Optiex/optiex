import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor(private http: HttpClient) { }

  getSensorsData(data:any) {
    return this.http.post(`${environment.SERVER_ADDRESS}/s/get/data/`, data);
  }

  getGraphs(dept_id:any) {
    var data = { id: dept_id };
    return this.http.post(
      `${environment.SERVER_ADDRESS}/s/user/graph/list/`,
      data
    );
  }

  showGraphOnFrontPage(data:any) {
    return this.http.post(
      `${environment.SERVER_ADDRESS}/s/show/graph/`,
      data
    );
  }

  getEquipmentList(data:any) {
    return this.http.post(
      `${environment.SERVER_ADDRESS}/c/emp/equipment/list/`,
      data
    );
  }

  getEquipmentGraphList(data:any) {
    return this.http.post(
      `${environment.SERVER_ADDRESS}/c/emp/chart/list/`,
      data
    );
  }

  downloadReport(data:any) {
    return this.http.post(
      `${environment.SERVER_ADDRESS}/s/get/data/report/`,
      data,
      { responseType: 'text' }
    );
  }
}
