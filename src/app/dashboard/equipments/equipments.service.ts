import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentsService {

  constructor(private http: HttpClient) { }

  getEquipments(id:any): Observable<any> {
    return this.http.post(`${environment.SERVER_ADDRESS}/c/emp/equipment/list/`,{id:id});
  }
}
