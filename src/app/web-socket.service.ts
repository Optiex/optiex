import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  socket:any;
  private sensorDataSource = new BehaviorSubject({});
  sensorData = this.sensorDataSource.asObservable();
  private chatDataSource = new BehaviorSubject({});
  chatData = this.chatDataSource.asObservable();
  constructor() {}

  isEmptyObj(obj:any) {
    return Object.keys(obj).length === 0;
  }
  changeData(data:any) {
    if (data["sensor_data"] && !this.isEmptyObj(data["sensor_data"])) {
      this.sensorDataSource.next(data["sensor_data"]);
    } else if (data["chat_data"] && !this.isEmptyObj(data["chat_data"])) {
      this.chatDataSource.next(data["chat_data"]);
    }
  }

}
