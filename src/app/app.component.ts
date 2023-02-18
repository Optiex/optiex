import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { WebSocketService } from './web-socket.service';
const USER_KEY = 'user';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private storage:Storage, private websocketService: WebSocketService,
    private navCtrl: NavController) {}

  async ngOnInit() {
    await this.storage.create();

    let user = await this.storage.get(USER_KEY);
    if(user){
      this.navCtrl.navigateRoot('/dashboard/departments');
    }
  }


}
