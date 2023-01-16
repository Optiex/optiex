import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { WebSocketService } from '../web-socket.service';
import { DashboardService } from './dashboard.service';

const USER_KEY = 'user';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  activePageTitle = 'Dashboard';
  pages = [
    {
      title: 'Departments',
      url: '/dashboard/departments',
      icon: 'cog'
    },
    // {
    //   title: 'Alert',
    //   url: '/dashboard/alert',
    //   icon: 'alert'
    // },
    {
      title: 'Reports',
      url: '/dashboard/report',
      icon: 'copy'
    },
    {
      title: 'Logout',
      url: null,
      icon: 'log-out'
    }
  ];

  sessionId:string = '';

  user:any;
  role:any;

  constructor(private dashboardService: DashboardService,
    private storage: Storage,
    private navCtrl: NavController,
    private websocketService: WebSocketService) {
    storage.get(USER_KEY).then((toke:any) => {
      this.user = JSON.parse(toke).user;
      this.role = JSON.parse(toke).role;
      this.websocket(JSON.parse(toke).sessionid)
    });
  }

  ngOnInit() {
    console.log('DashboardPage')
    // this.getDepartmentList();
  }

  getDepartmentList() {
    this.dashboardService.getDepartmentList()
    .subscribe((data:any) => {
      console.log(data);
    });
  }

  websocket(sessionid:any) {
    var self = this;
    var socket = new WebSocket(
      'wss://analytics.optiex.co.in:1994/?session_key='+sessionid
    );
    socket.onmessage = function(e) {
      var data = JSON.parse(e.data);
      self.websocketService.changeData(data);
    };
    socket.onopen = function() {
      self.websocketService.socket = socket;
    };
    if (socket.readyState == WebSocket.OPEN) {
      socket.onopen(event as any);
    }
  }

  logout(){
    this.navCtrl.navigateRoot('/login');
    this.storage.clear();
  }

}

