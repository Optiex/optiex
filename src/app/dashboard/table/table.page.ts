import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { TableService } from './table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.page.html',
  styleUrls: ['./table.page.scss'],
})
export class TablePage implements OnInit {
  id:any;
  formData:any;
  date:any;
  objectKeys = Object.keys;

  tableData:any = [];

  saveData:any = {};


  constructor(private activatedRoute: ActivatedRoute,
    private tableService: TableService,
    private storage: Storage,
    public datepipe: DatePipe) {
    this.activatedRoute.params.subscribe((params:any) => {
      if (params && params.id) {
        this.id = params.id;
      }
      console.log(this.id);
    });
  }

  ngOnInit() {
    this.prepareForm();
  }

  prepareForm() {
    // this.formData = {
    //   "from_datetime": {
    //     "data_type": "datetime",
    //     "title": "Date",
    //     "value":""
    //   },
    //   "to_datetime": {
    //     "data_type": "datetime",
    //     "title": "To Date",
    //     "value":""
    //   },
    //   "shift": {
    //     "data_type": "dropdown",
    //     "title": "Shift",
    //     "values": [
    //       {
    //         "title": "Shift A",
    //         "value": "A"
    //       },
    //       {
    //         "title": "Shift B",
    //         "value": "B"
    //       },
    //       {
    //         "title": "Shift C",
    //         "value": "C"
    //       }
    //     ],
    //     "value":{
    //       "title": "Shift C",
    //       "value": "C"
    //     }
    //   },
    //   "rows": {
    //     "data_type": "list",
    //     "title":"Table Rows",
    //     "schema": {
    //       "generation": {
    //         "title": "Generation",
    //         "data_type": "string"
    //       },
    //       "production": {
    //         "title": "Production",
    //         "data_type": "string"
    //       },
    //       "ton": {
    //         "title": "Ton",
    //         "data_type": "number"
    //       }
    //     },
    //     "default_value": [
    //       {
    //         "generation": "PM-I"
    //       },
    //       {
    //         "generation": "PM-II"
    //       },
    //       {
    //         "generation": "PM-IV"
    //       },
    //       {
    //         "generation": "PM-V"
    //       },
    //       {
    //         "generation": "Pulp"
    //       }
    //     ],
    //     'value':[]
    //   }
    // };


    this.storage.get('table').then((table: any) => {
      this.formData = JSON.parse(table).schema;
      console.log(this.formData);
      for(let form in this.formData){
        console.log(form)

        if(this.formData[form].data_type == 'datetime'){
          this.formData[form].value = '';
        }
        if(this.formData[form].data_type == 'date'){
          this.formData[form].value = '';
        }
        if(this.formData[form].data_type == 'dropdown'){
          this.formData[form].value = {};
        }
        if(this.formData[form].data_type == 'list'){
          this.formData[form].value = [];
          this.formData[form].title = 'Table Rows';
        }
      }

      this.formData.rows.default_value.forEach((elmt:any) => {
        let row = [];
        for(let shm in this.formData.rows.schema){
          let obj:any = {
            title: this.formData.rows.schema[shm].title,
            data_type:this.formData.rows.schema[shm].data_type,
            value: elmt[shm],
            field: shm
          }
          row.push(obj);
        }
        this.tableData.push(row);
      });

      console.log(this.tableData);

    });


  }


  save(){
    this.tableData.forEach((table:any) => {
      let obj:any = {};
      table.forEach((tab:any) => {
        obj[tab.field] = tab.value || null;
      });
      this.formData.rows.value.push(obj)
    });

    for(let form in this.formData){
      if(this.formData[form].data_type == 'datetime'){
        console.log(this.formData[form].value);
        this.formData[form].value = this.datepipe.transform(this.formData[form].value, 'dd/MM/yyyy hh:mm a')
      }
      if(this.formData[form].data_type == 'date'){
        this.formData[form].value = this.datepipe.transform(this.formData[form].value, 'dd/MM/yyyy')
      }
      this.saveData[form] = this.formData[form].value || null;
    }

    let data = {
      form_schema_id:this.id,
      data: this.saveData
    }

    this.tableService.saveFormSchemaValue(data)
    .subscribe((res:any) => {
      console.log(res);
    });
  }


}
