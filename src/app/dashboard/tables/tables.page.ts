import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    public storage: Storage) {
  }

  ngOnInit() {
    this.tables = [{title:'Test',uuid:'asdasdsd'}]
    this.getSchema();
  }

  getSchema(){
    this.tablesService.getSchema().subscribe((schema:any) => {
      console.log(schema);
      this.tables = schema.data;
    });
  }

  async gotoTable(table:any){
    await this.storage.set('table', JSON.stringify(table));
    this.router.navigateByUrl('/dashboard/table/'+table.uuid);
  }

}
