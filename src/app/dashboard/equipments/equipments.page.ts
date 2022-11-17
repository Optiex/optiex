import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.page.html',
  styleUrls: ['./equipments.page.scss'],
})
export class EquipmentsPage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('EquipmentsPage')
  }

}
