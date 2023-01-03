import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { TablesService } from './tables.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.page.html',
  styleUrls: ['./tables.page.scss'],
})
export class TablesPage implements OnInit {

  tables:any;

  constructor(private router: Router,
    public tablesService: TablesService,
    public loadingController: LoadingController,
    public storage: Storage) {
  }

  ngOnInit() {
    // this.tables = [{title:'Test',uuid:'asdasdsd'}]
    this.getSchema();
  }

  async getSchema(){
    const loading = await this.loadingController.create();
    await loading.present();

    this.tablesService.getSchema().subscribe(
      async (schema:any) => {
        await loading.dismiss();
        console.log(schema);
        this.tables = schema.data;
      },
      async (schema:any) => {
        await loading.dismiss();
      });
  }

  async gotoTable(table:any){
    await this.storage.set('table', JSON.stringify(table));
    this.router.navigateByUrl('/dashboard/table/'+table.uuid);
  }

}
