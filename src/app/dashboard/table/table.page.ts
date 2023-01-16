import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
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
  tableObj: any;
  objectKeys = Object.keys;

  tableData:any = [];

  saveData:any = {};


  constructor(private activatedRoute: ActivatedRoute,
    private tableService: TableService,
    public loadingController: LoadingController,
    private alertController: AlertController,
    private location: Location,
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
      this.formData =
        {
          "from_datetime": {
            "data_type": "date",
            "title": "From Date"
          },
          "to_datetime": {
            "data_type": "datetime",
            "title": "To Date"
          },
          "rows": {
            "data_type": "list",
            "title":"Table Rows",
            "schema": {
              "shift": {
                "data_type": "dropdown",
                "title": "To Date",
                "values": [
                  {
                    "title": "Shift A",
                    "value": "A"
                  },
                  {
                    "title": "Shift B",
                    "value": "B"
                  },
                  {
                    "title": "Shift C",
                    "value": "C"
                  }
                ]
              },
              "ton": {
                "title": "Ton",
                "data_type": "string"
              }
            },
            "default_value": [
              {
                "shift":{
                  "title": "Shift A",
                  "value": "A"
                }
              },
              {"shift":{
                "title": "Shift B",
                "value": "B"
              }
            },
            {"shift":{
              "title": "Shift C",
              "value": "C"
            }
          }]
          }
      };


  this.storage.get('table').then((table: any) => {
    this.tableObj = JSON.parse(table);
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
          values: this.formData.rows.schema[shm].values,
          field: shm,
          disabled: this.formData.rows.schema[shm].disabled || false,
          required: this.formData.rows.schema[shm].required || false
        }
        row.push(obj);
      }
      this.tableData.push(row);
    });


  });


}


async save(){

  let validation = false;
  this.formData.rows.value = [];
  this.tableData.forEach((table:any) => {
    let obj:any = {};
    table.forEach((tab:any) => {
      obj[tab.field] = tab.value || null;
      if(tab.required && !tab.value) {
        validation = true;
      }
    });
    this.formData.rows.value.push(obj)
  });

  for(let form in this.formData){
    if(this.formData[form].data_type == 'datetime'){
      if(this.formData[form].required && !this.formData[form].value){
        validation = true;
      } else {
        this.formData[form].value = new Date(this.formData[form].value).getTime();
      }
    }
    if(this.formData[form].data_type == 'date'){
      if(this.formData[form].required && !this.formData[form].value){
        validation = true;
      } else {
        this.formData[form].value = new Date(this.formData[form].value).getTime();
      }
    }
    this.saveData[form] = this.formData[form].value || null;
  }

  let data = {
    // form_schema_id:this.id,
    form_schema:this.tableObj,
    data: this.saveData
  }

  if(validation) {
    const alert = await this.alertController.create({
      header: 'Validation Error',
      message: 'Please fill all required information.',
      buttons: ['OK']
    });
    await alert.present();
  } else {
    const loading = await this.loadingController.create();
    await loading.present();
    this.tableService.saveFormSchemaValue(data)
    .subscribe(async (res:any) => {
      await loading.dismiss();
      const alert = await this.alertController.create({
        message: 'Saved Successfully!',
      });
      await alert.present();

      this.location.back();

    }, async (res:any) => {
      this.prepareForm();
      await loading.dismiss();
      const alert = await this.alertController.create({
        message: 'Something went wrong.',
      });

      await alert.present();
    });
  }

}

back(){
  this.location.back();
}

compareFn(e1: any, e2: any): boolean {
  return e1 && e2 ? e1.value == e2.value : e1 == e2;
}

}
