import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { DepartmentService } from './services/department.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox/tab1', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox/tab1', icon: 'paper-plane' }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  public username;

  constructor(private departmentService: DepartmentService) {}

  async ngOnInit(){
    let userDetails = await Storage.get({key:'user'});
    console.log(userDetails.value);
    this.username = JSON.parse(userDetails.value).user;

    this.getDepartmentList();
  }

  getDepartmentList() {
    this.departmentService.getDepartmentList()
    .subscribe((data:any) => {
      console.log(data);
    });
  }

}
